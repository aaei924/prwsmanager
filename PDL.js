/*
* PRASEOD-'s discord bot library
* 
*/
module.exports = {
    o: {
        o: (cl, t, c) => cl.on(t, c),
        r: (cl, c) => cl.once('ready', c)
    },
    c: {
        s: (c,h,m) => c.channels.fetch(h).then((ch) => ch.send(m).then(console.log).catch(console.error)).catch
    },
    l: (cl, t) => cl.login(t),
    m: {
        a: (m) => m.author,
        b: (m) => m.author.bot,
        c: (m) => m.content,
        d: {
            b: (m,a) => m.channel.bulkDelete(a),
            s: (c,u,m) => c.users.fetch(u).then((usr) => usr.send(m).catch(console.error)).catch
        },
        s: (m,c) => m.channel.send(c).then(console.log).catch(console.error),
        m: {
            u: (m) => m.mentions.users
        },
        p: (msg,p) => msg.member.permissions.has(p),
        ph: (msg,p) => msg.guild.me.permissions.has(p),
        r: (m,c) => m.reply(c),
        t: (m) => m.channel.type
    },
    u: {
        a: (c,f,d) => c.displayAvatarURL({format: f, dynamic: d}),
        sa: (cl, a,b) => cl.user.setActivity(a, {type: b}),
        n: (c) => c.username,
        i: (c) =>c.id,
        u: (cl) => cl.user
    },
    err: (d,m,msg,c) => {
        var ee = {
            color: 0x9d4a46,
            title: 'Error '+c.toString(),
            author: {name: d.m.a(msg).tag, icon_url: d.m.a(msg).displayAvatarURL()},
            description: m.error[c],
            timestamp: new Date(),
            footer: {
                icon_url: msg.guild.iconURL(),
                text: msg.guild.name
            }
        }
        d.m.s(msg,{embed: ee})
    },
    err305: (d,m,msg) => {
        return {    
            embed: {
                color: 0x9d4a46,
                title: 'Error 305',
                author: {name: d.m.a(msg).tag, icon_url: d.m.a(msg).displayAvatarURL()},
                description: m.error[305],
                timestamp: new Date(),
                footer: {
                    icon_url: msg.guild.iconURL(),
                    text: msg.guild.name
                }
            }
        }
    },
    rejectInjection: (txt) => {
        var regex = /\[([^[]*)\]\(.*\)/g
        return txt.replaceAll(regex, '\\'+"$&")
    }
}