/*
* PRASEOD-'s discord bot library
* 
*/
module.exports = {
o: {
    r: (cl, c) => cl.once('ready', c),
    m: (cl, c) => cl.on('message', c)
},
l: (cl, t) => cl.login(t),
m: {
    a: (m) => m.author,
    b: (m) => m.author.bot,
    c: (m) => m.content,
    d: {
        b: (m,a) => m.channel.bulkDelete(a)
    },
    s: (m,c) => m.channel.send(c),
    m: {
        u: (m) => m.mentions.users
    },
    r: (m,c) => m.reply(c),
    t: (m) => m.channel.type
},
u: {
    a: (c,f,d) => c.displayAvatarURL({format: f, dynamic: d}),
    sa: (cl, a,b) => cl.user.setActivity(a, {type: b}),
    n: (c) => c.username,
    i: (c) =>c.id,
    u: (cl) => cl.user
}
}
