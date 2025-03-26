import tester from "../utils/logic";


const Test = () => {
    const object = tester();
    if (object.playerboard) {
        object.printAssignment(object.playerboard);
    }
    
    return(<>
        <p>Hello</p>
    </>)
}

export default Test;