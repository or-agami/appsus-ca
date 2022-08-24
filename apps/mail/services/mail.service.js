import { storageService } from "../../../services/storage.service.js"
export const mailService = {
    query,
    getUser,
    getById,
    removeMail
}

const KEY = 'EmailsDB'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

const gEmails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e102',
        subject: 'hello Friend!',
        body: 'photos from australia',
        isRead: false,
        sentAt: 1551133930594,
        to: 'puki@muki.com'
    },
    {
        id: 'e103',
        subject: 'Sale on ZARA',
        body: 'all summer collection in 25% discount!',
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    }]


function query() {
    let emails = _loadFromStorage()
    if(!emails) emails = gEmails
    _saveToStorage(emails)
    return Promise.resolve(emails)
}
    // let emails = _loadFromStorage() || gEmails
    // _saveToStorage(emails)
    // if (filterBy) {
    //     let { vendor, minSpeed, maxSpeed } = filterBy
    //     if (!minSpeed) minSpeed = 0;
    //     if (!maxSpeed) maxSpeed = Infinity
    //     cars = cars.filter(car => (
    //         car.vendor.includes(vendor) &&
    //         car.speed >= minSpeed &&
    //         car.speed <= maxSpeed
    //     ))
    // }



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


