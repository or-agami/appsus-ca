import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const keepService = {
    query,
    getById,
    keepAdd,
}

const KEY = 'keepDB'
const gKeeps = [
    {
        id: "n101",
        type: "keep-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "keep-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "var(--clr-plt5)"
        }
    },
    {
        id: "n103",
        type: "keep-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving license", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
]

function query(filterBy) {
    console.log('filterBy from keepService:', filterBy)
    let keeps = _loadFromStorage()
    if (!keeps) {
        keeps = gKeeps
        _saveToStorage(keeps)
    }

    if (filterBy.type) {
        keeps = keeps.filter(keep => keep.type === filterBy.type)
    }

    return Promise.resolve(keeps)
}

function getById(keepId) {
    if (!keepId) return Promise.resolve(null)
    const keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    return Promise.resolve(keep)
}

function keepAdd(keep) {
    // if (!keep) return
    keep.id = utilService.makeId()
    let keeps = _loadFromStorage()
    keeps = [keep, ...keeps]
    _saveToStorage(keeps)
    return Promise.resolve()
}

function _saveToStorage(keeps) {
    storageService.saveToStorage(KEY, keeps)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}