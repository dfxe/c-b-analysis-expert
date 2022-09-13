import AddField from "../../components/survey/InputField";
import ReactDOM from "react-dom";
describe("My First Test", () => {
  it("Renders the component to an arbitrary DOM element", () => {
    const doc = document.createElement("div");
    ReactDOM.render(<AddField></AddField>, doc);
    expect(doc.children.length > 0).to.be.true;
    expect(doc.children[0].firstChild).to.be.visible;
  });
});

describe("Editing a field in details provider gives the right thing", () => {});
