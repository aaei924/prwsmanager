const Discord = require("discord.js");
const request = require("request");
const requestp = require("request-promise");
const PREFIX = '++'
const token = 'YOUR TOKEN HERE'
const client = new Discord.Client();

client.on("ready", () => {
        console.log('PRWS ready.');
        client.user.setActivity('PRWS Discord Manager', { type: "PLAYING" });
    })

client.on('message', msg => {
    if (msg.author.equals(client.user) || msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;
    var args = msg.content.substring(PREFIX.length).split(" ")

    switch (args[0].toLowerCase()) {
        case "안녕": // 명령어 감지
            msg.channel.send("> 안녕하세요.")
            break;
        case 'namu':
            
        case '':
            break;

        default:
            const helpembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('도움말')
                .setURL('https://prws.kr/')
                .setAuthor('PRWS Discord Manager', 'https://prws.kr/favicon.ico', 'https://prws.kr')
                .setDescription('봇 명령어 도움말')
                .addFields({ name: '++안녕', value: '인사합니다.' }, { name: '++핑', value: '현재 핑을 알려줍니다.', inline: true }, { name: '++나무 [문서명]', value: '해당 문서의 나무위키 링크를 띄워줍니다.', inline: true }, { name: '++이미지 [파일이름.확장자]', value: 'prws.kr에 업로드 된 이미지 파일을 불러옵니다.', inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Powered by PRWS.kr', value: 'PRWS에서 더 많은 서비스를 누려보세요!', inline: true })
                .setTimestamp()
                .setFooter('PRWS Discord Manager', 'https://prws.kr/favicon.ico');
            msg.channel.send(helpembed);
            break;
    }



});

client.login(token)
