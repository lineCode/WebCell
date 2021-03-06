import { createCell, render, renderToStaticMarkup } from '../source/renderer';
import { Fragment } from '../source/utility/vDOM';

describe('Renderer', () => {
    it('should render HTML attributes, CSS Styles/Classes & Dataset', () => {
        render(
            <a
                title="Test"
                style={{ color: 'red' }}
                className="btn btn-primary"
                data-toggle="#test"
                custom={1}
            >
                Test
            </a>
        );

        expect(document.body.innerHTML.trim()).toBe(
            '<a custom="1" title="Test" data-toggle="#test" class="btn btn-primary" style="color: red;">Test</a>'
        );
    });

    it('should call Function while DOM rendering', () => {
        const hook = jest.fn();
        const Test = jest.fn(() => <a ref={hook} />);

        render(<Test prop1={1}>test</Test>);

        expect(hook).toBeCalledTimes(1);
        expect(Test).toBeCalledWith({ prop1: 1, defaultSlot: ['test'] });
    });

    it('should render SVG attributes, CSS Styles/Classes', () => {
        document.body.innerHTML = '';

        render(
            <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="red" fill="grey" />
            </svg>
        );

        expect(document.body.innerHTML.trim()).toBe(
            '<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="red" fill="grey"></circle></svg>'
        );
    });

    it('should render VDOM to Markup', () => {
        const source = renderToStaticMarkup(
            <Fragment>
                <div
                    className="test"
                    style={{ color: 'red', opacity: 0.5 }}
                    data-test="example"
                >
                    test
                    <br />
                    <span>example</span>
                </div>
                sample
            </Fragment>
        );

        expect(source).toBe(
            '<div data-test="example" class="test" style="color: red; opacity: 0.5;">test<br><span>example</span></div>sample'
        );
    });
});
