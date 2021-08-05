module.exports = (d,c,m,msg,args,conf,cn) => {
    if (!args[1])
        return d.err(d,m,msg,301);
    
    if (msg.author == conf.master) {
        var exec = require('ssh-exec')
        she = exec(args.slice(1).join(' '), {user: conf.sshUser,host: conf.sshHost,password: conf.sshPass}).pipe(process.stdout , function (err, stdout, stderr) {
            if ( err ) { console.log(err); }
        })
    } else
        d.err(d,m,msg,200)
}