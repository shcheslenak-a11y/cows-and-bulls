import { QuessReslut } from "./interfaces.js";

function createElement(tag: string, attibutes={}, innerText:string = ''){
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attibutes)) element.setAttribute(key, String(value));
    if (innerText)
        element.innerText = innerText;
    return element;

}

const options:{ [key: string]: Array<Array<string>> } = {
    base: [['bin', '2'], ['oct', '8'], ['dec', '10'], ['hex', '16']],
    length: [['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6','6']],
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

function createLayout():void {
    const header = createElement("header");
    const options = createElement("div", {class:'flex'});
    const base = createElement("div", {id: "base", class:'flex'});
    const length = createElement("div", {id: "length", class:'flex'});
    options.append(base, length);
    const startButton = createElement("div", {id: "start", class: "button"});
    header.append(options, startButton);

    //main
    const main = createElement("main", {class:'flex-column hidden'});
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
}

export class DOMManager{
    private config: {base: string, length:number, isGameOn: boolean, turns:number, timer:number, history: Array<Array<string>>}
    constructor(config: {base: string, length:number, isGameOn: boolean, turns:number, timer:number, history: Array<Array<string>>}) {
        this.config = config;
        createLayout();
        this.fillHeader();
        this.fillTable();
    }

    gameStart(){
        const base = document.getElementById('base')?.getElementsByClassName('selected') || []
        const length = document.getElementById('length')?.getElementsByClassName('selected') || []
        console.log(base, length)
        if (!base.length || !length.length) {
            alert("Select Base and Length")
            return false;
        }
        this.config.base = (base[0] as HTMLElement).dataset.value || '';
        this.config.length = Number((length[0]  as HTMLElement).dataset.value) || 0;
        (document.getElementById("guess") as HTMLInputElement).maxLength = this.config.length;
        this.config.isGameOn = true;
        document.getElementsByTagName("main")[0]?.classList.remove('hidden')
        return true
    }

    getGuess() {
        return (document.getElementById("guess") as HTMLInputElement).value;
    }

    removeLast() {
        const inputField = document.getElementById("guess") as HTMLInputElement;
        inputField.value = inputField.value.slice(0, -1);
    }

    show(result: QuessReslut) {
        document.getElementById("bulls-number")!.innerText = String(result.bulls);
        document.getElementById("cows-number")!.innerText = String(result.cows);
        (document.getElementById("guess")as HTMLInputElement)!.value = '';
        document.getElementById("turns")!.innerText = String(this.config.turns);
        this.fillTable();
    }

    fillTable() {
        const table = document.getElementById('history');
            table?.replaceChildren();
            table?.append(
            createRow(["#", "GUESS", "BULLS", "COWS"], true),
            ... this.config.history.map((el: Array<string>) => createRow(el))
        )
    }

    fillHeader() {
        const base = document.getElementById("base")
        base!.replaceChildren();
        const labelBase = createElement('label');
        labelBase.innerText='Base: ';

        base!.append(
            labelBase,
            this.createOptions('base')
        )

        const length = document.getElementById("length")
        length!.replaceChildren();
        const labelLength = createElement('label')
        labelLength.innerText='Length: '
        length!.append(
            labelLength,
            this.createOptions('length')
        )
        for( let opt of document.getElementsByClassName("option"))
            opt.addEventListener('click', (e: Event) => {
                    if(!opt.classList.contains('selected')){
                        for(let child of opt.parentNode!.children) child.classList.remove('selected');
                        opt.classList.add('selected');
                    }
                })

        document.getElementById("start")!.innerText = 'Start';
    } 
    
    createOptions(opt: string): HTMLElement{
        if (this.config.isGameOn){
            const label = createElement("label")
            label.innerText = this.config[opt as keyof typeof this.config] as string;
            return label
        }
        const wrapper = createElement('div', {class: 'option-wraper'})
        wrapper.append(
            ...(options[opt]!.map((el: Array<string>)=>{
                return createElement('div', {'data-value': el[0], class: "option"}, el[1]as string);
            }))
        )
        return wrapper  
    }

    stopGame() {

    }


    getActiveElements() {
        return {
            start: document.getElementById('start'),
            input: document.getElementById('guess')
        }
    }

    invalidGuess() {
        (document.getElementById("guess")as HTMLInputElement)!.value = '';
    }
}