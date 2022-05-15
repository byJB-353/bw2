const { default: WaConection, useSingleFileAuthState, fetchLatestBaileysVersion } = require("@adiwajshing/baileys")
const fs = require('fs')
const FileType = require('file-type')
const path = require('path')
const pino = require('pino')
const { color } = require('./color')
const prefix = '.'
var totalcommands = []
//modulos
    
module.exports = client = async (client, up) => {
try {
	const fromMe = mek.key.fromMe
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const body = (type === 'conversation') ? mek.message.conversation : (type == 'imageMessage') ? mek.message.imageMessage.caption : (type == 'videoMessage') ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (mek.message.buttonsResponseMessage?.selectedButtonId || mek.message.listResponseMessage?.singleSelectReply.selectedRowId || (type == 'listResponseMessage' ? mek.msg.singleSelectReply.selectedRowId : '') || mek.msg.text || mek.msg.caption || mek.msg || '') : ''
const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
totalcommands.push(command)
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
const me = client.user
const ownerNumber = ['xxxx@s.whatsapp.net']
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
const pushname =  mek.pushName || "Persona sin nombre"

//Informaci�n del grupo
const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''

//
const isOwner = ownerNumber.includes(sender)
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false

	
//Reply
const reply = (texto) => {
      client.sendMessage(from, {text: texto}, {quoted:mek, ephemeralExpiration: WA_DEFAULT_EPHEMERAL})
        }
        
        //Muesta el comando usado en la consola
if (isCmd && isGroup) {
console.log(color('[', 'magenta'), color('➳', 'white'), color(']', 'magenta'), color('Comando'), color(`${prefix + command}`, 'white'), color('Nombre'), color(`${isOwner ? 'Es Mi creador 👑' : `${pushname}`}`, 'white'), color('En el Grupo'), color(`${groupName}`, 'yellow'), 'Args:', color(args.length))
}
if (isCmd && !isGroup) {
console.log(color('[', 'magenta'), color('➳', 'white'), color(']', 'magenta'), color('Comando'), color(`${prefix + command}`, 'white'), color('En Privado'), color('De', 'yellow'), color(`${isOwner ? 'Mi creador 👑' : `${pushname}`}`, 'white'), 'args:', color(args.length))
}

client.ev.on('presence-update', json => console.log(json))
await client.presenceSubscribe(m.sender) 

//Quoteds
const isviewOnce = (type == "viewOnceMessage")
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isAudio = (type == 'audioMessage')
const isSticker = (type == 'stickerMessage')
const isContact = (type == 'contactMessage')
const isLocation = (type == 'locationMessage')
const isCatalog = (type == 'productMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false



//Auto respon
if (budy.includes("hola")){
reply('Hola')
}

switch (command) {
case 'test':
reply("Hola " + pushname)
break
}
//coneccion con html
const express = require('./v.html')
//Fin
} catch (e) {
const error = String(e)

const JID = up.messages[0]
const CHAT = JID.key.remoteJid
client.sendMessage(CHAT, {text: e}, {quoted: JID})
client.sendMessage('xxx@s.whatsapp.net', {text: e}, {quoted: JID})

console.log('Error : %s', color(e, 'red'))
console.log(e)
}
})
