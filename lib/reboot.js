module.exports = (d,c,m,msg,args,conf,cn) => {
    if (msg.author == conf.master) {
        d.m.s(msg, 'Rebooting Client...')
        var exec = require('ssh-exec')
        she = exec('pm2 restart 2', {user: conf.sshUser,host: conf.sshHost,password: conf.sshPass}).pipe(process.stdout , function (err, stdout, stderr) {
            if ( err ) { console.log(err); }
        })
    } else
        d.err(d,m,msg,200);
}