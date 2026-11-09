function createElement(tag: string, attibutes={}, innerText:string = ''){
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attibutes)) element.setAttribute(key, String(value));
    if (innerText)
        element.innerText = innerText;
    return element;

}

let isGameOn = false
let config:{ [key: string]: string } = {base: '0', length:'0'}
const options:{ [key: string]: Array<Array<string>> } = {
    base: [['bin', '2'], ['oct', '8'], ['dec', '10'], ['hex', '16']],
    length: [['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6','6']],
}
let history: Array<Array<string>> = [];

function createOptions(opt: string): HTMLElement{
    if (isGameOn){
        const label = createElement("label")
        label.innerText = config[opt] as string;
        return label
    }
    const wrapper = createElement('div', {class: 'option-wraper'})
    wrapper.append(
        ...(options[opt]!.map((el: Array<string>)=>{
            const item = createElement('div', {'--data-value': el[0], class: "option"})
            item.innerText = el[1]as string;
            return item
        }))
    )
    return wrapper
    
}

function fillHeader(): void{
    const base = document.getElementById("base")
    base!.replaceChildren();
    const labelBase = createElement('label');
    labelBase.innerText='Base: ';

    base!.append(
        labelBase,
        createOptions('base')
    )

    const length = document.getElementById("length")
    length!.replaceChildren();
    const labelLength = createElement('label')
    labelLength.innerText='Length: '
    length!.append(
        labelLength,
        createOptions('length')
    )
    document.getElementById("start")!.innerText = 'Start';
}


function createRow(rowdata:Array<string>, header:boolean=false):HTMLElement{
    const row = createElement("tr")
    console.log(rowdata)
    row.append(
        ... rowdata.map((el:string) => {
            const item = createElement(header ? "th" : "td");
            item.innerText = el;
            return item;
        })
    )
    return row
}

function fillTable() {
    const table = document.getElementById('history');
    console.log(table)
    table?.replaceChildren();
    table?.append(
        createRow(["#", "GUESS", "BULLS", "COWS"], true),
        ... history.map((el: Array<string>) => createRow(el))
    )
}

function createLayout():void {
    const header = createElement("header");
    const options = createElement("div", {class:'flex'});
    const base = createElement("div", {id: "base", class:'flex'});
    const length = createElement("div", {id: "length", class:'flex'});
    options.append(base, length);
    const startButton = createElement("div", {id: "start", class: "button"});
    header.append(options, startButton);

    //main
    const main = createElement("main", {class:'flex-column'});
    const counter = createElement("div", {class:'flex'});
    const turns = createElement("div", {class:'flex'});
    turns.append(
        createElement("label", {class:'flex'}, 'Turns: '),
        createElement("label", {id:'turns', class:'flex'}, '0')
    )
    const timer = createElement("div", {class:'flex'});
    timer.append(
        createElement("label", {class:'flex'}, 'Time: '),
        createElement("label", {id:'timer', class:'flex'}, '0')
    )
    counter.append(turns, timer);

    const field = createElement("div", {class:'flex'});

    const playground = createElement("div", {class:'flex'});
    const input = createElement("input", {id: "guess", type:'text', maxlength: '6'});
    const bullsCowsCounter = createElement("div", {class:'flex-column'});
    const bullsCounter = createElement("div", {class:'flex'});
    bullsCounter.append(
        createElement("label", {id:'bulls-number', class:'flex'}, '0')
    )
    const cowsCounter = createElement("div", {class:'flex'});
    cowsCounter.append(
        createElement("label", {id:'cows-number', class:'flex'}, '0')
    )
    bullsCowsCounter.append(bullsCounter, cowsCounter);
    playground.append(input, bullsCowsCounter)

    const history = createElement("table", {id: 'history'});
    field.append(playground, history);
    main.append(counter, field)
    

    //footer
    const footer = createElement("footer");
    const course = createElement('a', {href: "https://rs.school/courses/javascript"})
    const courseImg = createElement('img', {src: "", alt: "RSSchool/Full-Stacj JS"})
    course.append(courseImg);
    const github = createElement('a', {href: "https://github.com/shcheslenak-a11y"})
    const githubImg = createElement('img', {src: "", alt: "Github"})
    github.append(githubImg);
    footer.append(course, '2026', github);
    document.body.append(header, main, footer)

    fillHeader();
    fillTable();
}

export class DOMManager{
    private config: {base: string, length:number, isGameOn: boolean, turns:number, timer:number};
    constructor(config:{base: string, length:number, isGameOn: boolean, turns:number, timer:number} ) {
        this.config = config;
        createLayout();
    }
}