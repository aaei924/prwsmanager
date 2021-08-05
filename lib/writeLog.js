module.exports = async (d,c,m,msg,args,conf,cn) => {
    var logcon = '';
    switch(args[0]) {
        case 'messageUpdate':
            if(args[2].guild)
                targetid = args[2].guild.id
            logcon = {
                fields: [
                    {name: '사용자 ID: '+args[2].author.id+'\n수정전:', value: args[1].content},
                    {name: '수정후:', value: args[2].content},
                    {name: '채널:', value: '<#'+args[2].channel.id+'>'+' ('+args[2].channel.id+')'},
                ],
                color: 0x0099ff,
                title: '메시지가 수정되었습니다.',
                author: {name: args[2].author.tag, icon_url: args[2].author.displayAvatarURL()},
                description: '[LINK]('+args[2].url+')',
                timestamp: new Date(),
                footer: {
                    icon_url: args[2].guild.iconURL(),
                    text: args[2].guild.name
                }
            }
            break;
        case 'channelCreate':
            if(args[1].type == 'dm')
                return;
            if(args[1].guild)
                targetid = args[1].guild.id
            channeltypes = {dm: 'DM', text: '텍스트 채널', voice: '음성 채널', category: '카테고리', news: '뉴스 채널', store: '스토어 채널', unknown: '알 수 없음'}
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'CHANNEL_CREATE'});
            if(args[1].isText() && AuditLog.entries.first())
                var executor = AuditLog.entries.first().executor
            else
                var executor = '알 수 없음'
                
            logcon = {
                fields: [
                    {name: '채널 종류:', value: channeltypes[args[1].
                    type]},
                    {name: '생성 채널:', value: '<#'+args[1].id+'>'},
                    {name: '채널 ID:', value: args[1].id},
                    {name: '실행자 ID: '+executor.id+'\n상위 카테고리:', value: args[1].parent.name+'\n'+'**ID:** '+args[1].parentID}
                ],
                color: 0x0099ff,
                title: '채널이 생성되었습니다.',
                author: {name: executor.tag, icon_url: executor.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].guild.iconURL(),
                    text: args[1].guild.name
                }
            }
            break;
        case 'channelDelete':
            if(args[1].guild)
                targetid = args[1].guild.id
            channeltypes = {dm: 'DM', text: '텍스트 채널', voice: '음성 채널', category: '카테고리', news: '뉴스 채널', store: '스토어 채널', unknown: '알 수 없음'}
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'CHANNEL_DELETE'});
            if(args[1].isText() && AuditLog.entries.first())
                var executor = AuditLog.entries.first().executor
            else
                var executor = '알 수 없음'
                
            logcon = {
                fields: [
                    {name: '실행자 ID: '+executor.id+'\n삭제 채널:', value: args[1].name},
                    {name: '채널 ID:', value: args[1].id},
                    {name: '채널 종류:', value: channeltypes[args[1].
                    type]},
                    {name: '상위 카테고리:', value: args[1].parent.name+'\n'+'**ID:** '+args[1].parentID}
                ],
                color: 0xeb4d3d,
                title: '채널이 삭제되었습니다.',
                author: {name: executor.tag, icon_url: executor.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].guild.iconURL(),
                    text: args[1].guild.name
                }
            }
            break;
        case 'messageDelete':
            if(args[1].guild)
                targetid = args[1].guild.id
            logcon = {
                fields: [
                    {name: '사용자 ID: '+args[1].author.id+'\n메시지 ID: '+args[1].id+'\n\n삭제된 내용:', value: args[1].content},
                    {name: '채널:', value: '<#'+args[1].channel.id+'>'+' ('+args[1].channel.id+')'},
                ],
                color: 0xeb4d3d,
                title: '메시지가 삭제되었습니다.',
                author: {name: args[1].author.tag, icon_url: args[1].author.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].guild.iconURL(),
                    text: args[1].guild.name
                }
            }
            break;
        case 'guildBanAdd':
            targetid = args[1].id
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MEMBER_BAN_ADD'});
            if(args[1].isText() && AuditLog.entries.first())
                var reason = AuditLog.entries.first().reason
            else
                var reason = '알 수 없음'
            logcon = {
                fields: [
                    {name: '대상: ', value: '<@'+args[2].tag+'>\n**ID: **'+args[2].id},
                    {name: '사유:', value: reason},
                    {name: '실행자 ID: '+executor.id}
                ],
                color: 0xeb4d3d,
                title: '사용자가 서버에서 차단되었습니다.',
                author: {name: args[2].tag, icon_url: args[2].displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].iconURL(),
                    text: args[1].name
                }
            }
            break;
        case 'guildMemberRemove':
            targetid = args[1].id
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MEMBER_KICK'});
            if(args[1].isText() && AuditLog.entries.first())
                var en = AuditLog.entries.first()
            else
                return;
            logcon = {
                fields: [
                    {name: '대상: ', value: '<@'+args[1].tag+'>\n**ID: **'+args[1].id},
                    {name: '사유:', value: en.reason},
                    {name: '실행자 ID: '+en.executor.id}
                ],
                color: 0xeb4d3d,
                title: '사용자가 서버에서 추방되었습니다.',
                author: {name: args[1].tag, icon_url: args[1].displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].iconURL(),
                    text: args[1].name
                }
            }
            break;
    }
    cn.execute('SELECT * FROM `bot_op_alert` WHERE server=?', [targetid], function(err, rows) {
        if (err) {
            return d.err(d,m,msg,400)
            console.log(err);
        } else {
            for (var i = 0; i < rows.length; i++) {
                var thr = rows[i];
                if(thr.channel !== null){
                    cnl = thr.channel.toString()
                    d.c.s(c,cnl,{embed: logcon})
                }else if(thr.user !== null){
                    usr = thr.user.toString()
                    d.m.d.s(c,usr,{embed: logcon})
                }
            }
        }
    });
    cn.end();
}