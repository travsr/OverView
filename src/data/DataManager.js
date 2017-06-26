
let Parse = require('parse/react-native');
let instance = null;

export class DataManager{

    serverDataModel = {
        currentUser : null,
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
            this.getServerDataModel().then(() => {
                this.callbacks.forEach((cb,i) => { cb(); });
            });
        }

        // to test whether we have singleton or not
        this.time = new Date();

        return instance;
    }

    onAfterLoad(cb) {
        this.callbacks.push(cb);
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
            .then(() => this.selectSession(0))
            .then(() => Promise.all([
                this.getCharacters(),
                this.getMaps(),
            ]));
    }

    getCurrentUser() {
        console.log("getting current user");

        return new Promise((resolve, reject) => {
            // store current parse user in state, then get the history
            Parse.User.currentAsync().then((user) => {

                console.log("Got user");
                console.log(user.get('username'));
                if(user) {
                    this.serverDataModel.currentUser = user;
                    resolve(user);
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
        this.serverDataModel.selectedSession = this.serverDataModel.logSessions[index];

        // get log entries for this session
        return this.getCurrentUser().then(()=>{
            return new Promise((resolve, reject) => {

                // Make a query to get the user's history
                let q = new Parse.Query(Parse.Object.extend('LogEntry'));
                q.equalTo('user', this.serverDataModel.currentUser);
                q.equalTo('logSession', this.serverDataModel.selectedSession);
                q.include('map');
                q.include('characters');
                q.include('logSession');
                q.descending('createdAt');
                q.limit(1000);
                q.find().then((entries) => {
                    this.serverDataModel.selectedLogEntries = entries;
                    resolve(entries);
                }, (err) => {
                    reject(err);
                });
            });
        }, (err)=> {
            return new Promise((resolve,reject)=>{reject('could not get entries while not logged in')});
        });

    }

}