/* 

******** PRWS MANAGER ********

*/
const conf = require('./config.json').config;
const m = require('./msg/'+conf.language+'.json').msg;
const d = require("./PDL");
const request = require("request");
const requestp = require("request-promise");
const Discord = require('discord.js');
const c = new Discord.Client();
const sql = require('mysql2')
const cmds = conf.commands
sql.createConnection({
    host: conf.DBhost,
    user: conf.DBuser,
    password: conf.DBpass,
    database: conf.DBname
}).connect();

d.o.r(c, () => {
    console.log('PRWS ready.');
    d.u.sa(c, '정상작동', "PLAYING");
})
    
d.o.o(c, 'message', msg => {
    if (d.m.a(msg).equals(d.u.u(c)) || d.m.b(msg)) return;
    if (!d.m.c(msg).startsWith(conf.prefix)) return;
    var args = d.m.c(msg).substring(conf.prefix.length + 1).split(" ")
    if(cmds.indexOf(args[0]) !== -1){
        var exe = require('./lib/'+args[0])
        exe(d,c,m,msg,args,conf,cn)
    }

});
d.o.o(c, 'messageUpdate', (ol,ne) => {
    sqlconn();
    lib.writeLog(d,c,m,['messageUpdate',ol,ne],cn);
})
d.o.o(c, 'messageDelete', (ol,ne) => {
    sqlconn();
    lib.writeLog(d,c,m,['messageDelete',ol,ne],cn);
})
d.o.o(c, 'channelCreate', async ch => {
    sqlconn();
    lib.writeLog(d,c,m,['channelCreate',ch],cn)
})
d.o.o(c, 'channelDelete', async ch => {
    sqlconn();
    lib.writeLog(d,c,m,['channelDelete',ch],cn)
})
d.o.o(c, 'guildBanAdd', async (c, ch) => {
    sqlconn();
    lib.writeLog(d,c,m,['guildBanAdd',c,ch],cn)
})
d.o.o(c, 'guildMemberRemove', async ch => {
    sqlconn();
    lib.writeLog(d,c,m,['guildMemberRemove',ch],cn)
})
d.l(c, conf.token)
