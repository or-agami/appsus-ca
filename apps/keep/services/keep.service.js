import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const keepService = {
    query,
    getById,
    keepAdd,
    update,
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
            backgroundColor: "plt2"
        }
    },
    {
        id: "n103",
        type: "keep-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving license", doneAt: null },
                { txt: "Learn java script", doneAt: 187111111 },
                { txt: "Shopping", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
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

function update(editedKeep) {
    let keeps = _loadFromStorage()
    let keepIdx = keeps.findIndex(keep => editedKeep.id === keep.id)
    keeps.splice(keepIdx, 1, editedKeep)
    _saveToStorage(keeps)
    return Promise.resolve(editedKeep)
}

function keepAdd(newKeep, keepType) {
    if (!newKeep) return
    let keep = {}
    keep.id = utilService.makeId()
    keep.type = keepType
    keep.info = {}
    keep.info.title = newKeep.title
    console.log('keep.info from keepService:', keep.info)
    const { content } = newKeep
    switch (keepType) {
        case 'keep-txt':
            keep.info.txt = content
            break
        case 'keep-img':
            keep.info.url = content
            break
        case 'keep-video':
            keep.info.url = content
            break
        case 'keep-todos':
            keep.info.todos = content.split(',').map(todo => ({ txt: todo, doneAt: null }))
            break
        default:
            console.warn('Unknown keep type:', keepType)
            break
    }
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