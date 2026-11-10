import { QuessReslut } from "./interfaces.js";
import { Config } from "./config.js";
function createElement(tag: string, attibutes = {}, innerText: string = "") {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attibutes))
    element.setAttribute(key, String(value));
  if (innerText) element.innerText = innerText;
  return element;
}

const options: { [key: string]: Array<Array<string>> } = {
  base: [
    ["bin", "2"],
    ["oct", "8"],
    ["dec", "10"],
    ["hex", "16"],
  ],
  length: [
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
  ],
};

function createRow(
  rowdata: Array<string>,
  header: boolean = false,
): HTMLElement {
  const row = createElement("tr");
  row.append(
    ...rowdata.map((el: string) => {
      const item = createElement(header ? "th" : "td");
      item.innerText = el;
      return item;
    }),
  );
  return row;
}

function createLayout(): void {
  const header = createElement("header");
  const options = createElement("div", { class: "flex" });
  const base = createElement("div", { id: "base", class: "flex" });
  const length = createElement("div", { id: "length", class: "flex" });
  options.append(base, length);
  const errMesage = createElement("label", {
    id: "err-select",
    class: "hidden",
  });
  const buttons = createElement("div", { class: "flex" });
  const startButton = createElement("div", { id: "start", class: "button" });
  const leaderButton = createElement(
    "div",
    { id: "leaders", class: "button" },
    "Leaders",
  );
  buttons.append(startButton, leaderButton);
  header.append(options, errMesage, buttons);

  //main
  const main = createElement("main", { class: "flex-column hidden" });
  const counter = createElement("div", { class: "flex" });
  const turns = createElement("div", { class: "flex" });
  turns.append(
    createElement("label", { class: "flex" }, "Turns: "),
    createElement("label", { id: "turns", class: "flex" }, "0"),
  );
  const timer = createElement("div", { class: "flex" });
  timer.append(
    createElement("label", { class: "flex" }, "Time: "),
    createElement("label", { id: "timer", class: "flex" }, "0"),
  );
  counter.append(turns, timer);

  const field = createElement("div", { class: "flex" });
  const div = createElement("div", { class: "flex-column" });
  const playground = createElement("div", { class: "flex" });
  const input = createElement("input", {
    id: "guess",
    type: "text",
    maxlength: "6",
  });
  const bullsCowsCounter = createElement("div", { class: "flex-column" });
  const bullsCounter = createElement("div", { class: "flex" });
  bullsCounter.append(
    createElement("img", { src: "../assets/bull.png", alt: "Bulls" }),
    createElement("label", {}, ":"),
    createElement("label", { id: "bulls-number", class: "flex" }, "0"),
  );
  const cowsCounter = createElement("div", { class: "flex" });
  cowsCounter.append(
    createElement("img", { src: "../assets/cow.png", alt: "Cows " }),
    createElement("label", {}, ":"),
    createElement("label", { id: "cows-number", class: "flex" }, "0"),
  );
  bullsCowsCounter.append(bullsCounter, cowsCounter);
  playground.append(input, bullsCowsCounter);
  div.append(
    playground,
    createElement("label", { id: "err-enter", class: "hidden" }),
  );
  const history = createElement("table", { id: "history" });
  const historyWrapper = createElement("div");
  historyWrapper.append(history);
  field.append(div, historyWrapper);
  main.append(counter, field);

  //footer
  const footer = createElement("footer");
  const course = createElement("a", {
    href: "https://rs.school/courses/javascript",
  });
  const courseImg = createElement("img", {
    src: "../assets/logo.svg",
    alt: "RSSchool/Full-Stack JS",
  });
  course.append(courseImg);
  const github = createElement("a", {
    href: "https://github.com/shcheslenak-a11y",
  });
  const githubImg = createElement("img", {
    src: "../assets/github.png",
    alt: "Github",
  });
  github.append(githubImg);
  footer.append(course, "2026", github);

  const modal = createElement("dialog", { id: "modal" });
  const modalInner = createElement("div");
  modalInner.append(
    createElement("h2", { id: "modal-header" }),
    createElement("div", { id: "modal-content" }),
    createElement("div", { id: "close", class: "button" }, "Close"),
  );
  modal.append(modalInner);

  document.body.append(header, main, footer, modal);
}

export class DOMManager {
  private config: Config;
  constructor(config: Config) {
    this.config = config;
    createLayout();
    this.fillHeader();
    this.fillTable();
    document.getElementById("close")!.addEventListener("click", () => {
      this.close();
    });
  }

  timer() {
    if (this.config.getStatus()) {
      document.getElementById("timer")!.innerText = String(
        this.config.getTime(),
      );
      this.config.increaseTime();
      setTimeout(() => this.timer(), 1000);
    }
  }

  gameStart() {
    const base =
      document.getElementById("base")?.getElementsByClassName("selected") || [];
    const length =
      document.getElementById("length")?.getElementsByClassName("selected") ||
      [];
    if (!base.length || !length.length) {
      document.getElementById("err-select")!.innerText =
        "Please select base and length";
      document.getElementById("err-select")?.classList.remove("hidden");
      return false;
    }
    if (
      (base[0] as HTMLElement).dataset.value == "bin" &&
      (length[0] as HTMLElement).dataset.value != "2"
    ) {
      document.getElementById("err-select")!.innerText =
        "Binary base support only length 2";
      document.getElementById("err-select")?.classList.remove("hidden");
      return false;
    }
    this.config.setBase((base[0] as HTMLElement).dataset.value || "");
    this.config.setLength(
      Number((length[0] as HTMLElement).dataset.value) || 0,
    );
    (document.getElementById("guess") as HTMLInputElement).maxLength =
      this.config.getLength();
    this.config.setStatus(true);
    this.fillTable();
    document.getElementsByTagName("main")[0]?.classList.remove("hidden");
    this.fillHeader();
    this.timer();
    document.getElementById("err-enter")?.classList.add("hidden");
    (document.getElementById("guess") as HTMLInputElement).value = "";
    document.getElementById("err-select")?.classList.add("hidden");
    return true;
  }

  getGuess() {
    document.getElementById("err-enter")!.classList.add("hidden");
    return (document.getElementById("guess") as HTMLInputElement).value;
  }

  removeLast() {
    const inputField = document.getElementById("guess") as HTMLInputElement;
    inputField.value = inputField.value.slice(0, -1);
  }

  show(result: QuessReslut) {
    document.getElementById("bulls-number")!.innerText = String(result.bulls);
    document.getElementById("cows-number")!.innerText = String(result.cows);
    (document.getElementById("guess") as HTMLInputElement)!.value = "";
    document.getElementById("turns")!.innerText = String(
      this.config.getTurns(),
    );
    this.fillTable();
  }

  fillTable() {
    const table = document.getElementById("history");
    table?.replaceChildren();
    table?.append(
      createRow(["#", "GUESS", "BULLS", "COWS"], true),
      ...this.config
        .getHistory()
        .map((el: Array<string>, index: number) =>
          createRow([String(index + 1)].concat(el)),
        ),
    );
  }

  fillHeader() {
    const base = document.getElementById("base");
    base!.replaceChildren();
    const labelBase = createElement("label");
    labelBase.innerText = "Base: ";

    base!.append(labelBase, this.createOptions("base"));

    const length = document.getElementById("length");
    length!.replaceChildren();
    const labelLength = createElement("label");
    labelLength.innerText = "Length: ";
    length!.append(labelLength, this.createOptions("length"));
    for (const opt of document
      .getElementsByTagName("header")[0]!
      .getElementsByClassName("option"))
      opt.addEventListener("click", () => {
        if (!opt.classList.contains("selected")) {
          for (const child of opt.parentNode!.children)
            child.classList.remove("selected");
          opt.classList.add("selected");
        }
      });

    document.getElementById("start")!.innerText = this.config.getStatus()
      ? "Resign"
      : "Start";
  }

  createOptions(opt: string): HTMLElement {
    if (this.config.getStatus()) {
      const label = createElement("label");
      label.innerText = (
        opt == "base" ? this.config.getBase() : this.config.getLength()
      ) as string;
      return label;
    }
    const wrapper = createElement("div", { class: "option-wraper" });
    wrapper.append(
      ...options[opt]!.map((el: Array<string>) => {
        return createElement(
          "div",
          { "data-value": el[0], class: "option" },
          el[1] as string,
        );
      }),
    );
    return wrapper;
  }

  getActiveElements() {
    return {
      start: document.getElementById("start"),
      input: document.getElementById("guess"),
      leaders: document.getElementById("leaders"),
    };
  }

  invalidGuess(guess: string, err: boolean = true) {
    let reasonStr;
    if (err) reasonStr = `Guess '${guess}' already tried`;
    else reasonStr = `invalid guess '${guess}'`;
    document.getElementById("err-enter")!.innerText = reasonStr;
    document.getElementById("err-enter")!.classList.remove("hidden");
    (document.getElementById("guess") as HTMLInputElement)!.value = "";
  }

  reset() {
    document.getElementsByTagName("main")[0]?.classList.add("hidden");
    document.getElementById("timer")!.innerText = "0";
    document.getElementById("turns")!.innerText = "0";
    document.getElementById("bulls-number")!.innerText = "0";
    document.getElementById("cows-number")!.innerText = "0";
    this.fillHeader();
  }

  open(data: { header: string; content: Array<HTMLElement> }) {
    document.getElementById("modal-header")!.innerText = data.header;
    document.getElementById("modal-content")?.replaceChildren();
    document.getElementById("modal-content")?.append(...data.content);
    (document.getElementById("modal") as HTMLDialogElement).showModal();
  }

  close() {
    document.getElementById("modal-content")?.replaceChildren();
    (document.getElementById("modal") as HTMLDialogElement).close();
  }

  showWin() {
    const content = [
      createElement("label", {}, `Time: ${this.config.getTime()}`),
      createElement("label", {}, `Turns: ${this.config.getTurns()}`),
    ];
    this.open({
      header: "Congratulations",
      content: content,
    });
  }

  showLeaders(leaders: {
    [key: string]: { [key: string]: Array<Array<string>> };
  }) {
    const base = createElement("div", { id: "leader-base" });
    const wrapperBase = createElement("div", { class: "option-wraper" });
    wrapperBase.append(
      createElement(
        "div",
        { "data-value": "all", class: "option selected" },
        "All",
      ),
      ...options["base"]!.map((el: Array<string>) => {
        return createElement(
          "div",
          { "data-value": el[0], class: "option" },
          el[1] as string,
        );
      }),
    );
    base.append(createElement("label", {}, "Base:"), wrapperBase);

    const length = createElement("div", { id: "leader-length" });
    const wrapperLength = createElement("div", { class: "option-wraper" });
    wrapperLength.append(
      createElement(
        "div",
        { "data-value": "all", class: "option selected" },
        "All",
      ),
      ...options["length"]!.map((el: Array<string>) => {
        return createElement(
          "div",
          { "data-value": el[0], class: "option" },
          el[1] as string,
        );
      }),
    );
    length.append(createElement("label", {}, "Length:"), wrapperLength);

    const table = createElement("table", { id: "leader-table" });
    const content = [base, length, table];
    this.open({
      header: "Leaders",
      content: content,
    });
    for (const opt of document
      .getElementById("modal-content")!
      .getElementsByClassName("option"))
      opt.addEventListener("click", () => {
        if (!opt.classList.contains("selected")) {
          for (const child of opt.parentNode!.children)
            child.classList.remove("selected");
          opt.classList.add("selected");
          this.fillLeaders(leaders);
        }
      });
    this.fillLeaders(leaders);
  }

  fillLeaders(leaders: {
    [key: string]: { [key: string]: Array<Array<string>> };
  }) {
    const base = (
      document
        .getElementById("leader-base")
        ?.getElementsByClassName("selected")[0] as HTMLElement
    ).dataset.value;
    const length = (
      document
        .getElementById("leader-length")
        ?.getElementsByClassName("selected")[0] as HTMLElement
    ).dataset.value;
    const table = document.getElementById("leader-table") as HTMLElement;
    let leaderList: Array<Array<string>> = [];
    const baseFiltered = Object.entries(leaders).filter(([key]) => {
      if (base != "all") return key == base;
      else return true;
    });
    for (const [keyBase, value] of baseFiltered) {
      Object.entries(value).map(([keyLength, records]) => {
        if (length != keyLength && length != "all") return;
        (records || []).forEach((record) => {
          const shownRecord = [...record];
          if (base == "all") shownRecord.push(keyBase);
          if (length == "all") shownRecord.push(keyLength);
          leaderList.push(shownRecord);
        });
      });
    }
    leaderList.sort(
      (a, b) => Number(a[0]) - Number(b[0]) || Number(a[1]) - Number(b[2]),
    );
    leaderList = leaderList.slice(0, 10);
    table?.replaceChildren();
    const header = ["#", "turns", "time", "date"];
    if (base == "all") header.push("Base");
    if (length == "all") header.push("Length");
    table?.append(
      createRow(header, true),
      ...leaderList.map((el: Array<string>, index: number) =>
        createRow([String(index + 1)].concat(el)),
      ),
    );
  }
}
