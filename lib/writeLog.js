module.exports = async (d,c,m,args,cn,msg) => {
    await cn.connect()
    var logcon = '';
    switch(args[0]) {
        case 'messageUpdate':
            if(args[2].guild)
                targetid = args[2].guild.id
            
            if(typeof args[1].content == 'string')
                args[1].content = d.rejectInjection(args[1].content)
            if(typeof args[2].content == 'string')
                args[2].content = d.rejectInjection(args[2].content)
            
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
            channeltypes = {dm: 'DM', text: '텍스트 채널', voice: '음성 채널', category: '카테고리', news: '뉴스 채널', store: '스토어 채널', unknown: '알 수 없는 채널'}
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'ChannelCreate'});
            if(typeof args[1] == 'string' && AuditLog.entries.first())
                var executor = AuditLog.entries.first().executor
            else
                var executor = '알 수 없음'
                
            logcon = {
                fields: [
                    {name: '생성 채널: <#'+args[1].id+'>\n채널 ID: '+args[1].id+'\n실행자 ID: '+executor.id+'\n카테고리: '+args[1].parent.name, value: '**ID:** '+args[1].parentID}
                ],
                color: 0x0099ff,
                title: '새 '+channeltypes[args[1].type]+'이(가) 생성되었습니다.',
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
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'ChannelDelete'});
            if(typeof args[1] == 'string' && AuditLog.entries.first())
                var executor = AuditLog.entries.first().executor
            else
                var executor = '알 수 없음'
                
            logcon = {
                fields: [
                    {name: '실행자 ID: '+executor.id+'\n삭제 채널: '+args[1].name+'\n채널 ID: '+args[1].id+'\n카테고리: '+args[1].parent.name, value: '**ID:** '+args[1].parentID}
                ],
                color: 0xeb4d3d,
                title: channeltypes[args[1].type]+'이(가) 삭제되었습니다.',
                author: {name: executor.tag, icon_url: executor.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].guild.iconURL(),
                    text: args[1].guild.name
                }
            }
            break;
        case 'messageDelete':
            var additional_string = ''
            var writer = false
            
            if(args[1].guild)
                targetid = args[1].guild.id
            
            // Check Audit Log
            if(d.m.ph(args[1], 'VIEW_AUDIT_LOG')){
                var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MESSAGE_DELETE'});
                var entry = AuditLog.entries.first()
                if (entry){
                    if(
                        entry.extra.channel.id === args[1].channel.id
                        && (entry.target.id === args[1].author.id)
                        && (entry.createdTimestamp > (Date.now() - 5000))
                        && entry.extra.count >= 1
                    ) {
                    // By Operator
                        var executor = AuditLog.entries.first().executor
                        additional_string = '\n실행자 ID: '+executor.id
                        writer = {name:'\n실행자: ', value: '<@'+executor.id+'>\n'}
                        var embed_msg = '타인의 메시지를 삭제하였습니다.'
                        var ok = true
                    }
                }
                
                if(!ok){
                    // By oneself
                    var executor = args[1].author
                    var embed_msg = '자신의 메시지를 삭제하였습니다.'
                }  
            }else{
                // 감사로그 권한 없음 = 스스로 삭제로 간주
                var writer = {name:'\n알림: ', value: '감사 로그 권한이 없어 삭제한 사람을 확인할 수 없습니다.\n'}
                var executor = args[1].author
                var embed_msg = '누군가가 메시지를 삭제하였습니다.'
            }
            
            if(typeof args[1].content == 'string')
                args[1].content = d.rejectInjection(args[1].content)

            if(args[1].content.length < 1)
                args[1].content = '[ 내용을 표시할 수 없음 ]'
            
            logcon = {
                fields: [
                    {name: '사용자 ID: '+args[1].author.id+'\n메시지 ID: '+args[1].id+additional_string+'\n\n삭제된 내용:', value: args[1].content},
                    {name: '채널: ', value: '<#'+args[1].channel.id+'>'+' ('+args[1].channel.id+')'},
                ],
                color: 0xeb4d3d,
                title: embed_msg,
                author: {name: args[1].author.tag, icon_url: args[1].author.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: args[1].guild.iconURL(),
                    text: args[1].guild.name
                }
            }
            
            if(writer)
                logcon.fields.push(writer)
            break;
        case 'guildBanAdd':
            targetid = args[1].id
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MEMBER_BAN_ADD'});
            if(typeof args[1] == 'string' && AuditLog.entries.first())
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
            
            logcon = {
                fields: [
                    {name: '대상: ', value: '<@'+args[1].tag+'>\n**ID: **'+args[1].id}
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
            
            
            if(d.m.ph(args[1], 'VIEW_AUDIT_LOG')){
                var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MEMBER_KICK'});
                if(typeof args[1] == 'string' && AuditLog.entries.first()){
                    var en = AuditLog.entries.first()
                
                    logcon.fields.push(
                        {name: '사유:', value: en.reason},
                        {name: '실행자 ID: '+en.executor.id}
                    )
                }
            }
            break;
        case 'guildMemberUpdate':
            targetid = args[1].id
            var AuditLog = await args[1].guild.fetchAuditLogs({limit:1, type: 'MEMBER_KICK'});
            if(typeof args[1] == 'string' && AuditLog.entries.first())
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
                title: '사용자 설정이 변경되었습니다.',
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
            return //d.err(d,m,args[2],400)
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
    })
}