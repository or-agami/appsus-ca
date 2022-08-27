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
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "plt1"
        }
    },
    {
        id: "n102",
        type: "keep-img",
        isPinned: true,
        info: {
            title: "Stack overflow picture",
            url: "./assets/img/stack-overflow.png",
        },
        style: {
            backgroundColor: "plt5"
        }
    },
    {
        id: "n103",
        type: "keep-mail",
        isPinned: false,
        info: {
            title: "Cloudflare",
            subject: "Maintenance to DNS Records1661611723235",
            body: "Hello, Cloudflare will be carrying out maintenance work to make the DNS records database more performant and increase its availability. During the maintenance window, updates to DNS records might be delayed. This includes other services that may create DNS records on your behalf like Spectrum, Load Balancing, or automatic TLS certificate validation."
        },
        style: {
            backgroundColor: "plt5"
        }
    },
    {
        id: "n104",
        type: "keep-video",
        isPinned: false,
        info: {
            title: "Best audition ever",
            videoId: "D9g8xbLtmJQ",
            url: "https://www.youtube.com/watch?v=D9g8xbLtmJQ",
        },
        style: {
            backgroundColor: "plt3"
        }
    },
    {
        id: "n105",
        type: "keep-img",
        isPinned: false,
        info: {
            title: "Awesome Keyboard!",
            url: "https://preview.redd.it/68emv6pzd8k91.jpg?width=640&crop=smart&auto=webp&s=d339c0ebc587552ea6f9bd585a3c9a71d23c6501",
        },
        style: {
            backgroundColor: "plt2"
        }
    },
    {
        id: "n106",
        type: "keep-todos",
        isPinned: false,
        info: {
            title: "Get my stuff together",
            todos: [
                { txt: "Driving license", doneAt: null },
                { txt: "Learn java script", doneAt: 187111111 },
                { txt: "Shopping", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
            ]
        }
    },
    {
        id: "n107",
        type: "keep-todos",
        isPinned: true,
        info: {
            title: "Today:",
            todos: [
                { txt: "Improve UI and UX", doneAt: 1661599881439 },
                { txt: "Add extra features", doneAt: 1661599982639 },
                { txt: "Impress Yaron with this app", doneAt: null },
                { txt: "Master JavaScript", doneAt: null },
            ]
        },
        style: {
            backgroundColor: "plt5"
        }
    },
]


function query(filterBy) {
    let keeps = _loadFromStorage()
    if (!keeps) {
        keeps = gKeeps
        _saveToStorage(keeps)
    }

    if (filterBy.type) {
        keeps = keeps.filter(keep => keep.type === filterBy.type)
    }

    if (filterBy.searchTerm !== '') {
        const term = filterBy.searchTerm.toLowerCase()
        keeps = keeps.filter((keep) => {
            return (
                ((keep.type === 'keep-img' || keep.type === 'keep-video') ?
                    keep.info.title ?
                        (keep.info.title.toLowerCase().includes(term))
                        : false
                    : true) &&
                (keep.type === 'keep-txt' ?
                    (keep.info.txt.toLowerCase().includes(term)) ||
                    (keep.info.title ? keep.info.title.toLowerCase().includes(term) : false)
                    : true
                ) &&
                (keep.type === 'keep-todos' ?
                    (keep.info.todos.some(todo => todo.txt.toLowerCase().includes(term))) ||
                    (keep.info.title ? keep.info.title.toLowerCase().includes(term) : false)
                    : true
                )
            )
        })
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
    keep.isPinned = false
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
            keep.info.videoId = _getVideoIdFromYTURL(content)
            break
        case 'keep-todos':
            keep.info.todos = content.split(',').map(todo => ({ txt: todo, doneAt: null }))
            break
        case 'keep-mail':
            keep.info.title = content.title
            keep.info.subject = content.subject
            keep.info.body = content.body
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

function _getVideoIdFromYTURL(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp)
    return (match && match[7].length == 11) ? match[7] : false
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