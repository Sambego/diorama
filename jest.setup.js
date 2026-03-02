const { TextEncoder, TextDecoder } = require('util');
const { MessageChannel, MessagePort } = require('worker_threads');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.MessageChannel = MessageChannel;
global.MessagePort = MessagePort;
