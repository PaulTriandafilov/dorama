# Dorama
Dorama provides you with an elegant way to build page objects for web testing using both inheritance and composition.
It provides two abstract classes - Page and Component to build page objects and combine everthing together, allowing you to focus on the business logic of the application and write more readable tests.

## Installation
```sh
npm i -D dorama
```

## Usage
### Page creation

```ts
import { Dorama } from "dorama";

export class IndexPage extends Dorama.Page {
  url = () => "/";

  // returns playwright's Locator
  readonly startNowButton = this.locator("a");

  // returns array of playwright's Locator
  readonly lineItems = this.locators("a");
  
  // return complex component Header with it's own root container
  readonly headerComponent = this.component(Header, "header");

  // return array of components BookComponent
  readonly booksComponents = this.components(BookComponent, ".books-list li");
}
```

#### API

| Method      | Description                              |
|------------|---------------------------------------|
| `abstract url(routes?: RoutesType): string;`  | Abstract method you have to implement in inherited class to be able to navigate to page |
| `goto(routes?: RoutesType): Promise<Response>` | Go to url |
| `protected locator(selector: string): Locator ` | Return Locator by passed selector |
| `protected locators(selector: string): Promise<Array<Locator>> ` | Return array of Locators by passed selector (made only for code readability) |
| `protected component<T extends Component>(ComponentClass, componentContainer): T` | Returns instance of Component |
| `protected components<T extends Component>(ComponentClass, componentContainer): Components<T>` | Returns array of Components |
| `getPage()` | Returns playwright's page |

url(routes?: RoutesType) optionaly accepts `routes` param (Record<string, string>), which allows you build url dynamicaly. For example `url = (routes: { authorId: string }) => '/app/#/author/${routes.authorId}';` allows you to navigate to particular author

### Component creation

```ts
import { Dorama } from "dorama";

export class BookComponent extends Dorama.Component {
  readonly cover = this.locator(".cover");
  readonly title = this.locator(".list-book-item-title");
  readonly data = this.locator(".book-info-data");
}
```

All locators and components inside component are built relative to component's root container

#### API

| Method      | Description                              |
|------------|---------------------------------------|
| `protected locator(selector: string): Locator ` | Return Locator by passed selector relative to component root container |
| `protected locators(selector: string): Promise<Array<Locator>> ` | Return array of Locators by passed selector (made only for code readability) relative to component root container |
| `protected component<T extends Component>(ComponentClass, componentContainer): T` | Returns instance of Component relative to component root container |
| `protected components<T extends Component>(ComponentClass, componentContainer): Components<T>` | Returns array of Components relative to component root container|

You also have access to component's root container by `component` property

### Components list

When there is list of similar components on web page, use components() method to get Components instance (which stores list of your components). It was implemented this way to provide API to asynchronously iterate over list of components:

| Method      | Description                              |
|------------|---------------------------------------|
| `filter(callback: (component: T) => Promise<boolean>): Promise<T[]>` | Filter list of T components |
| `find(callback: (component: T) => Promise<boolean>): Promise<T>` | Find T component in list |
| `map<R>(callback: (section: T) => Promise<R>): Promise<Awaited<R>[]>` | Map over list of T components |
| `nth(index: number): T` | Return nth T component by index |
| `first(): T` | Return first T component |
| `all(reInit?: boolean): Promise<Array<T>>` | Return components array. Use reInit flag to reinit when there are corresponding changes on page |
| `count(): number` | Return components count |

## Resources
An example of usage - https://github.com/PaulTriandafilov/dorama-test

## Contacts
For any questions and troublshooting DM in [telegram](https://t.me/sonic_808)
