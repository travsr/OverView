
let Parse = require('parse/react-native');
let instance = null;

export class DataManager{

    serverDataModel = {
        currentUser : null,
        entryStartDate : null,
        entryEndDate : null,
        logEntries : [],
        logSessions : [],
        selectedLogEntries : [],
        selectedSession : {},
        characters : [],
        maps : []
    };

    callbacks = [];

    constructor() {

        // If no instance exists create one and make calls to get the data
        if(!instance) {
            instance = this;
            this.getServerDataModel();
        }

        // to test whether we have singleton or not
        this.time = new Date();
        this.isLogFromSession = true;
        return instance;
    }

    onDataChange(cb) {
        this.callbacks.push(cb);
    }

    dispatchOnDataChangeEvent() {
        this.callbacks.forEach((cb)=>{
            cb();
        });
    }

    // Calls all functions that get
    // data for the server data model
    getServerDataModel() {
        console.log("Getting server model...");
        return this.getCurrentUser()
            .then(() => this.getLogSessions())
            .then(() => Promise.all([
                this.selectSession(0),
                this.getCharacters(),
                this.getMaps(),
            ]))
            .then(() => {
                this.dispatchOnDataChangeEvent();
            })
    }

    getCurrentUser() {
        console.log("getting current user");

        return new Promise((resolve, reject) => {
            // store current parse user in state, then get the history
            Parse.User.currentAsync().then((user) => {

                console.log("Got user");
                console.log(user.get('username'));
                if(user) {
                    user.fetch().then(()=>{
                        this.serverDataModel.currentUser = user;
                        resolve(user);
                        this.dispatchOnDataChangeEvent();

                    });

                }
                else {
                    reject("Not logged in");
                }
            }, (err) => {
                console.log("getting user error");
                console.log(err);
                reject(err)
            });
        });

    }

    getLogEntries() {

        return this.getCurrentUser().then(()=>{
            return new Promise((resolve, reject) => {

                // Make a query to get the user's history
                let q = new Parse.Query(Parse.Object.extend('LogEntry'));
                q.equalTo('user', this.serverDataModel.currentUser);
                q.include('map');
                q.include('characters');
                q.include('logSession');
                q.descending('createdAt');
                q.limit(1000);
                q.find().then((entries) => {
                    this.serverDataModel.logEntries = entries;
                    resolve(entries);
                }, (err) => {
                    reject(err);
                });
            });
        }, (err)=> {
            return new Promise((resolve,reject)=>{reject('could not get entries while not logged in')});
        });

    }

    getLogSessions() {

        return this.getCurrentUser().then(()=>{

            return new Promise((resolve, reject) => {
                // Make a query to get the user's history
                let q = new Parse.Query(Parse.Object.extend('LogSession'));
                q.equalTo('user', this.serverDataModel.currentUser);
                q.descending('createdAt');
                q.limit(1000);
                q.find().then((logSessions) => {
                    this.serverDataModel.logSessions = logSessions;
                    resolve(logSessions);
                }, (err) => {
                    reject(err);
                });
            });

        }, (err)=>{
            return new Promise((resolve,reject)=>{reject('Could not get log sessions while not logged in')});
        });

    }


    getCharacters() {

        if(this.serverDataModel.characters.length == 0) {

            return new Promise((resolve, reject) => {
                // Make a query to get the characters from parse
                let q = new Parse.Query(Parse.Object.extend('Character'));
                q.ascending('order');
                q.find().then((chars) => {
                    this.serverDataModel.characters = chars;
                    resolve(chars);
                }, (err) => {
                    reject(err);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                resolve(this.serverDataModel.characters);
            });
        }
    }

    getMaps() {
        if(this.serverDataModel.maps.length == 0) {
            return new Promise((resolve, reject) => {
                // Make a query to get the characters from parse
                let q = new Parse.Query(Parse.Object.extend('Map'));
                q.ascending('order');
                q.find().then((maps) => {
                    this.serverDataModel.maps = maps;
                    resolve(maps);
                }, (err) => {
                    reject(err);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                resolve(this.serverDataModel.maps);
            });
        }
    }


    selectSession(index) {
        // select session
       // this.serverDataModel.selectedSession = this.serverDataModel.logSessions[index];

        console.log("Select session called");

        if(this.serverDataModel.logSessions && this.serverDataModel.logSessions[index]) {
            let startDate = this.serverDataModel.logSessions[index].get('createdAt');
            let endDate = this.serverDataModel.logSessions[index].get('updatedAt');

            // add a 15-minute window to be inclusive in capture all log entries
            startDate = new Date( startDate.getTime() -  900000);
            endDate = new Date(endDate.getTime() + 900000);

            console.log("Getting session in range");
            return this.getSessionInRange(startDate, endDate);
        }
        else {
            console.log("Just resolving promise");
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        // return new Promise((resolve, reject) => {
        //
        //     // Make a query to get the user's history
        //     let q = new Parse.Query(Parse.Object.extend('LogEntry'));
        //     q.equalTo('user', this.serverDataModel.currentUser);
        //     q.equalTo('logSession', this.serverDataModel.selectedSession);
        //     q.include('map');
        //     q.include('characters');
        //     q.include('logSession');
        //     q.descending('createdAt');
        //     q.limit(1000);
        //     q.find().then((entries) => {
        //         this.serverDataModel.selectedLogEntries = entries;
        //         resolve(entries);
        //         this.dispatchOnDataChangeEvent();
        //     }, (err) => {
        //         reject(err);
        //     });
        // });
    }



    // Query database for entries in this time range
    // Create a session object based off this information
    getSessionInRange(startDate, endDate) {

        this.serverDataModel.entryStartDate = startDate;
        this.serverDataModel.entryEndDate = endDate;

        return Parse.User.currentAsync().then((user) => {

            console.log("Got user");
            if(!user) {
                return Parse.Promise.error("Not Logged In");
            }
            else {

                let q = new Parse.Query( Parse.Object.extend("LogEntry"));
                q.equalTo("user", user);
                q.greaterThanOrEqualTo('createdAt', startDate);
                q.lessThanOrEqualTo('updatedAt',endDate);

                console.log("doing query");
                console.log(startDate);
                console.log(endDate);

                return q.find();
            }
        }).then((logEntries) => {

            console.log("Got entries. Length : " + logEntries.length);



            // Create a new session object (this is what we need to be returning)
            let LogSession = Parse.Object.extend('LogSession');
            let logSession = new LogSession();


            // Tally up wins, losses, draws, character summary
            // (same as if we were calculating it server-side)
            let wins, losses, draws, summary;
            let mapResults, characterResults;

            summary = [];
            wins = 0;
            losses = 0;
            draws = 0;

            mapResults = {};
            characterResults = {};

            logEntries.forEach((entry) => {
                var result = entry.get('result');
                var characterNames = entry.get('characterNames');
                var mapName = entry.get('mapName');

                if(result)
                    summary.push(result);

                // count up generic wins/losses/draws
                if (result == 'win') {
                    wins++;
                }
                else if (result == 'loss') {
                    losses++;
                }
                else if (result == 'draw') {
                    draws++;
                }

                //count up on a character-specific basis
                characterNames.forEach((name, i) => {
                    if(!characterResults[name])
                        characterResults[name]  = {};

                    if(!characterResults[name]["_all"])
                        characterResults[name]["_all"] = [0,0,0];
                    if(!characterResults[name][mapName])
                        characterResults[name][mapName] = [0, 0, 0];

                    if (result == 'win') {
                        characterResults[name][mapName][0]++;
                        characterResults[name]["_all"][0]++;
                    }
                    else if (result == 'loss') {
                        characterResults[name][mapName][1]++;
                        characterResults[name]["_all"][1]++;
                    }
                    else if (result == 'draw') {
                        characterResults[name][mapName][2]++;
                        characterResults[name]["_all"][2]++;
                    }
                });

                // count up on a map-specific basis
                if(!mapResults[mapName])
                    mapResults[mapName] = {};

                if(!mapResults[mapName]["_all"])
                    mapResults[mapName]["_all"] = [0,0,0];
                if (result == 'win')
                    mapResults[mapName]["_all"][0]++;
                else if (result == 'loss')
                    mapResults[mapName]["_all"][1]++;
                else if (result == 'draw')
                    mapResults[mapName]["_all"][2]++;

                characterNames.forEach(function(name, i) {
                    if(!mapResults[mapName][name])
                        mapResults[mapName][name] = [0,0,0];
                    if (result == 'win')
                        mapResults[mapName][name][0]++;
                    else if (result == 'loss')
                        mapResults[mapName][name][1]++;
                    else if (result == 'draw')
                        mapResults[mapName][name][2]++;
                });

            });
            // End tally

            logSession.set({
                win: wins,
                loss: losses,
                draw: draws,
                summary: summary,
                characterResults : characterResults,
                mapResults : mapResults
            });





            this.serverDataModel.selectedSession = logSession;
            this.serverDataModel.selectedLogEntries = logEntries;

            console.log(this.serverDataModel.selectedLogEntries);

            this.dispatchOnDataChangeEvent();
            // Now return this as a resolved promise
            return Parse.Promise.as(logSession);


        });

    }

    // selectSession(index) {
    //
    //     return new Promise((resolve, reject) => {
    //
    //
    //         // select session
    //         this.serverDataModel.selectedSession = this.serverDataModel.logSessions[index];
    //
    //
    //
    //         this.serverDataModel.selectedSession.fetch().then(()=> {
    //
    //             // Make a query to get the user's history
    //             let q = new Parse.Query(Parse.Object.extend('LogEntry'));
    //             q.equalTo('user', this.serverDataModel.currentUser);
    //             q.equalTo('logSession', this.serverDataModel.selectedSession);
    //             q.include('map');
    //             q.include('characters');
    //             q.include('logSession');
    //             q.descending('createdAt');
    //             q.limit(1000);
    //             return q.find();
    //         }).then((entries) => {
    //
    //             this.serverDataModel.selectedLogEntries = entries;
    //             this.dispatchOnDataChangeEvent();
    //             resolve();
    //         }, (err) => {
    //
    //             reject(err);
    //         })
    //
    //
    //     });
    //
    //
    //
    //
    //
    // }

}