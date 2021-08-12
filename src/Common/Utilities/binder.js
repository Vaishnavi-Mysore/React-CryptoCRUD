
export class Binder {
    constructor(component) {
        this.component = component;
        this.onChange = (e) => {
            this.component.setState({ [e.target.name]: e.target.value });
        };
        this.onCheckedChange = (e) => {
            this.component.setState({ [e.target.name]: e.target.checked });
        };
    }
}
