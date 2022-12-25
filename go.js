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
cn = sql.createConnection({
    host: conf.DBhost,
    user: conf.DBuser,
    password: conf.DBpass,
    database: conf.DBname
})

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
const writeLog = require('./lib/writeLog')
d.o.o(c, 'messageUpdate', (ol,ne) => {
    if(ol.content !== ne.content)
        writeLog(d,c,m,['messageUpdate',ol,ne],cn);
})
d.o.o(c, 'messageDelete', (ol) => {
    writeLog(d,c,m,['messageDelete',ol],cn);
})
d.o.o(c, 'channelCreate', async ch => {
    writeLog(d,c,m,['channelCreate',ch],cn)
})
d.o.o(c, 'channelDelete', async ch => {
    writeLog(d,c,m,['channelDelete',ch],cn)
})
d.o.o(c, 'guildBanAdd', async (c, ch) => {
    writeLog(d,c,m,['guildBanAdd',c,ch],cn)
})
d.o.o(c, 'guildMemberUpdate', async (ol,ne) => {
    writeLog(d,c,m,['guildMemberUpdate',ol,ne],cn)
})
d.o.o(c, 'guildMemberAdd', async mem => {
    mem.guild.roles.fetch('873120679757746227').then(role =>{
    if(mem.guild.id == '873118719470075904'){
        mem.roles.add(role);
    }
    });
})
d.o.o(c, 'guildMemberRemove', async ch => {
    writeLog(d,c,m,['guildMemberRemove',ch],cn)
})
d.l(c, conf.token)