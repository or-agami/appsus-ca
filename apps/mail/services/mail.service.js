import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"
export const mailService = {
    query,
    getUser,
    getById,
    removeMail,
    createMail,
    getLocaleDate,
    update,
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
        sentAt: 1661610998529,
        to: 'momo@momo.com',
        labels: [],
        status: ['sent'],
    },
    {
        id: 'e102',
        from: 'havana',
        subject: 'hello Friend!',
        body: 'photos from australia',
        isRead: false,
        isStared: false,
        sentAt: 1661610988529,
        to: 'puki@muki.com',
        labels: [],
        status: ['sent']
    },
    {
        id: 'e103',
        from: 'ZARA Newsletter',
        subject: 'Sale on ZARA',
        body: 'all summer collection in 25% discount!',
        isRead: false,
        isStared: false,
        sentAt: 1661600998529,
        to: 'user@appsus.com',
        labels: [],
        status: ['inbox']
    },
    {
        id: 'e104',
        from: 'Cloudflare',
        subject: 'Maintenance to DNS Records',
        body: `Hello, Cloudflare will be carrying out maintenance work to make the DNS records database more performant and increase its availability. During the maintenance window, updates to DNS records might be delayed. This includes other services that may create DNS records on your behalf like Spectrum, Load Balancing, or automatic TLS certificate validation.`,
        isRead: false,
        isStared: false,
        sentAt: 1661611723235,
        to: 'user@appsus.com',
        labels: [],
        status: ['inbox']
    },
    {
        id: 'e105',
        from: 'Joe Tribiani',
        subject: 'How you doin?',
        body: 'hi, iwm looking for a date to a concert, would you like to come wih me? i have very cool friends.',
        isRead: true,
        isStared: false,
        sentAt: 1661611613235,
        to: 'user@appsus.com',
        labels: [],
        status: ['inbox']
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
        status: ['inbox']
    },
]

function query(filterBy, category = 'inbox', sortBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = gEmails
        _saveToStorage(emails)
    }
    if (category === 'stared') {
        emails = emails.filter(email => email.isStared === true)
    } else {
        emails = emails.filter(email => email.status.includes(category) || email.labels.includes(category))
    }
    if (filterBy) {
        let { txt, isRead } = filterBy
        txt = txt.toLowerCase()
        emails = emails.filter((email) => (
            ((email.subject.toLowerCase().includes(txt)) ||
                (email.body.toLowerCase().includes(txt)) ||
                (email.to.toLowerCase().includes(txt)) ||
                (email.from.toLowerCase().includes(txt))) &&
            ((isRead !== null) ? email.isRead === isRead : true)
        ))
    }
    if (sortBy) {
        const { prop, desc } = sortBy
        if (prop === 'date') {
            emails.sort((m1, m2) => (m1.sentAt - m2.sentAt) * ((desc) ? 1 : -1))
        } else if (prop === 'title') {
            emails.sort((m1, m2) => (m1.subject.localeCompare(m2.subject)) * ((desc) ? -1 : 1))
        }
    }
    return Promise.resolve(emails)
}

function createMail(newMail, isSent) {
    console.log('newMail from mailService:', newMail)
    if (newMail.id !== null) _updateMail(newMail, isSent)
    else _addMail(newMail, isSent)
    return Promise.resolve()
}

function update(updatedMail) {
    let mails = _loadFromStorage()
    let mailIdx = mails.findIndex(mail => updatedMail.id === mail.id)
    mails.splice(mailIdx, 1, updatedMail)
    _saveToStorage(mails)
    return Promise.resolve(updatedMail)
}

function _updateMail(newMail, isSent) {
    if (isSent) {
        newMail.status = ['sent']
        newMail.sentAt = Date.now()
    }
    if (newMail.to === loggedInUser.email) newMail.status.push('inbox')
    let mails = _loadFromStorage()
    const idx = mails.findIndex(mail => mail.id === newMail.id)
    mails.splice(idx, 1)
    mails = [newMail, ...mails]

    _saveToStorage(mails)
}


function _addMail(newMail, isSent) {
    console.log('1111111:', 1111111)
    const { to, subject, body } = newMail
    const mail = {
        from: loggedInUser.email,
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        isStared: false,
        sentAt: Date.now(),
        to,
        labels: [],
        status: isSent ? ['sent'] : ['drafts']
    }
    console.log('mail:', mail)
    if (mail.to === loggedInUser.email) mail.status.push('inbox')
    const mails = _loadFromStorage()
    mails.unshift(mail)
    _saveToStorage(mails)
}



function getUser() {
    return Promise.resolve(loggedInUser)
}

function getById(mailId) {
    if (!mailId) return Promise.resolve(null)
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
    const idx = mails.findIndex(mail => mail.id === mailId)
    const mail = mails[idx]
    console.log('mail.status:', mail.status)

    if (mail.status === ['trash']) {
        mails.splice(idx, 1)
    } else {
        mail.status = ['trash']
    }
    _saveToStorage(mails)
    return Promise.resolve()
}

function getLocaleDate(date) {
    const isToday = (Date.now() - date < 24 * 60 * 60 * 1000)
    return (isToday) ?
        new Date(date).toLocaleTimeString('en-IL', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        }) :
        new Date(date).toLocaleDateString('en-IL', {
            day: '2-digit',
            month: 'short'
        })
}


