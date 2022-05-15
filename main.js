const { default: WaConection, useSingleFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./connect.json')
const fs = require('fs')
const { Boom } = require('@hapi/boom')
const FileType = require('file-type')
const path = require('path')
const pino = require('pino')
const { color } = require('./color')
const prefix = '.'
var totalcommands = []
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' })})

//
const connect = async() => {
        let { version, isLatest } = await fetchLatestBaileysVersion()
        const client = WaConection({
		logger: pino({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state
	})
        
	client.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connect() : console.log(color('Sesion cerrada'));
		} else if (connection === 'open') {
			console.log(color('Conectado'), update);
			console.log(color('Wa versión:'), `${version.join('.')}, esLatest:`, color(`${isLatest}`))
		}
	})
    client.ev.on('creds.update', saveState)
 
 store.bind(client.ev)    

client.ev.on('messages.upsert', async (up) => {
try {
if (!up.messages) return
const mek = up.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
require("./index")(client, up, store)
        } catch (err) {
            console.log(err)
        }
    })
  
}
function nocache(module, cb = () => { }) {
  console.log("‣ Modulo", `'${module}'`, "se está revisando si hay cambios");
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
    });
    }

function uncache(module = '.') {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
      } catch (e) {
        reject(e);
        }
        });
        }

connect()

