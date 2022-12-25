module.exports = (d,c,m,msg,args,conf,cn) => {
    var help = '';
        help += '.sudo cl <count> : 메시지 삭제\n'
        help += '.sudo nslookup [options..] <host> : DNS 조회\n'
        help += '.sudo hash <algo> <text> [digest] : 문자열 암호화\n'
        help += '.sudo logging [options..] {username(mention)} : 로그 알림 대상 설정\n'
        help += '.sudo id [options..] {username(mention)} : 디스코드 내 ID 표시\n'
        help += '.sudo -h : 도움말 표시\n'
    var helpembed = {
        color: 0x0099ff,
        title: '도움말',
        author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
        fields: [
            {name: '명령어', value: help},
        ],
        timestamp: new Date(),
        footer: {
            icon_url: msg.guild.iconURL(),
            text: msg.guild.name
        }
    }
    d.m.s(msg, {embed: helpembed})
}
