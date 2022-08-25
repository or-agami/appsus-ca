import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"
export const mailService = {
    query,
    getUser,
    getById,
    removeMail,
    createMail
}

const KEY = 'EmailsDB'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

const gEmails = [
    {
        id: 'e101',
        from: 'blabla',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        labels: [],
        status: 'sent',
    },
    {
        id: 'e102',
        from: 'havana',
        subject: 'hello Friend!',
        body: 'photos from australia',
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        to: 'puki@muki.com',
        labels: [],
        status: 'sent'
    },
    {
        id: 'e103',
        from: 'ZARA Newsletter',
        subject: 'Sale on ZARA',
        body: 'all summer collection in 25% discount!',
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        labels: [],
        status: 'inbox'
    },
    {
        id: 'e104',
        from: 'Cloudflare',
        subject: 'Maintenance to DNS Records',
        body: `Hello, Cloudflare will be carrying out maintenance work to make the DNS records database more performant and increase its availability. During the maintenance window, updates to DNS records might be delayed. This includes other services that may create DNS records on your behalf like Spectrum, Load Balancing, or automatic TLS certificate validation.`,
        isRead: false,
        isStared: false,
        sentAt: 1551133940594,
        to: 'user@appsus.com',
        labels: [],
        status: 'inbox'
    },
    {
        id: 'e105',
        from: 'Joe Tribiani',
        subject: 'How you doin?',
        body: 'hi, iwm looking for a date to a concert, would you like to come wih me? i have very cool friends.',
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        labels: [],
        status: 'inbox'
    },
    {
        id: 'e106',
        from: 'Microsoft OneDrive',
        subject: 'Your OneDrive is almost full',
        body: `Your oragami0@gmail.com OneDrive storage is almost full. When OneDrive storage is full the documents, photos, and edits won't sync to OneDrive.com or your devices. Also, new documents and photos can't be added. To keep using OneDrive, upgrade your storage or remove files you no longer use.`,
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        labels: [],
        status: 'inbox'
    },
]

function query(filterBy, category = 'inbox') {
    console.log('hiiii:')
    let emails = _loadFromStorage()
    if (!emails) {
        emails = gEmails
        _saveToStorage(emails)
    }
    console.log('emails from mailService:', emails)
    emails = emails.filter(email => email.status === category || email.labels.includes(category))
    console.log('emails from mailService:', emails)
    if (filterBy) {
        let { txt, isRead, isStared } = filterBy
        txt = txt.toLowerCase()
        emails = emails.filter(email => (
            (email.subject.includes(txt) || email.body.includes(txt) || email.to.includes(txt)) &&
            (email.isRead === isRead) &&
            ((isRead !== null) ? email.isRead === isRead : true) &&
            ((isStared !== null) ? email.isStared === isStared : true)
        ))
        console.log('emails from mailService:', emails)
    }
    return Promise.resolve(emails)
}

function createMail(newMail, isSent) {
    const { to, subject, body } = newMail
    const mail = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        isStared: false,
        sentAt: Date.now(),
        to,
        labels: [],
        status: isSent ? 'sent' : 'drafts'
    }
    gEmails = [mail, ...gEmails]
    return Promise.resolve()
}


function getUser() {
    return Promise.resolve(loggedInUser)
}

function getById(mailId) {
    // if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function removeMail(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
}


