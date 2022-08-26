import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
const keepStyle = "../../../assets/css/cmps/keep-preview.css" // 👈 just for img export

export const keepService = {
    query,
    getById,
    keepAdd,
    update,
    // convertKeepToJpeg,
    exportAsImage,
    toggleMarkTodo,
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

function toggleMarkTodo(keepId, todoIdx) {
    return getById(keepId)
        .then(keep => {
            if (keep.info.todos[todoIdx].doneAt) keep.info.todos[todoIdx].doneAt = null
            else keep.info.todos[todoIdx].doneAt = Date.now()
            return (update(keep))
        })
}

function keepAdd(newKeep, keepType) {
    if (!newKeep) return
    let keep = {}
    keep.id = utilService.makeId()
    keep.type = keepType
    keep.info = {}
    keep.info.title = newKeep.title
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

// function convertKeepToJpeg(keepId) {
//     const elKeep = document.querySelector(`.${keepId}`)
//     html2canvas(elKeep)
//         .then(canvas => canvas.toDataURL('image/jpeg'))
//         .then(keepImg => {
//             const elKeepImgLink = document.createElement('a')
//             elKeepImgLink.href = keepImg
//             elKeepImgLink.download = 'My Keep.jpeg'
//             document.body.appendChild(elKeepImgLink)
//             elKeepImgLink.click()
//             document.body.removeChild(elKeepImgLink)
//         })

// }

function exportAsImage(elClass, imageFileName) {
    const elToExport = document.querySelector(`.${elClass}`)
    console.log('elToExport:', elToExport)
    html2canvas(elToExport)
        .then(canvas => canvas.toDataURL('image/png', 1.0))
        .then(img => downloadImage(img, imageFileName))
}

function downloadImage(img, fileName) {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = img;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};

function _saveToStorage(keeps) {
    storageService.saveToStorage(KEY, keeps)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}