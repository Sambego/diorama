# Diorama

Diorama is a set of React.js components to easily create an attractive and customisable presentation. All content will adjust to the available width of the screen, so you won't have some clipped slides when forced to present with a projector of lesser quality.

Why would you create a presentation in React.js instead of powerpoint, keynote or Google Slides? You can add live demos, straight in your slides. Since every slide is a react component, there's no limit to what you can do.

You can navigate trough the slides by using the arrow keys on your keyboard, using a presenter remote\* or swiping trough the slides on a mobile phone. By adding the `navigation` property to the `<deck />` component you can enable an onscreen navigation.

\* Tested with a Logitech R400 and Logitech Spotlight

## Demo

Check out the demo right here https://sambego.github.io/diorama-demo/

## Installing

```
# NPM
npm install @sambego/diorama
# Yarn
yarn add @sambego/diorama
# PNPM
pnpm install @sambego/diorama
```

## Usage

Once you have the components installed trough NPM, you can import them in your react project.

```javascript
import React from "react";
import { Deck, Slide, Title, Text } from "@sambego/diorama";

const MyApp = () => {
	return (
		<Deck>
			<Slide>
				<Title>This is the title of my presentation</Title>
			</Slide>
			<Slide>
				<Text>A witty joke to start off the presentation</Text>
			</Slide>
		</Deck>
	);
};
```

## Available components

### Summary

- [Deck](#deck)
- [Slide](#slide)
- [Title](#title)
- [Subtitle](#subtitle)
- [Text](#text)
- [Highlight](#highlight)
- [Quote](#quote)
- [Image](#image)
- [List](#list)
- [Columns](#columns)
- [Code](#code)
- [Browser](#browser)

### Deck

This is the root element of each presentation, it will handle navigation trough the slides. It accepts some properties.

- `navigation` or `showNavigationHUD`: when this property is present, an onscreen navigation will render on top of every slide (previous and next arrow);
- `presenterNotes`: Setting this property will open a new window with presenter notes on bootstrap or on reload.
- `footer`: Any valid react element, which will render with every slide. by default there is a `<Footer />` available.

```javascript
<Deck navigation presenterNotes>
	...
</Deck>
```

```javascript
const footer = <Footer left="@sambego" right="http://sambego.be" />
<Deck footer={footer}>...</Deck>
```

### Slide

Even though the `<Deck />` component accepts all valid React nodes as children, the `<Slide />` component will make sure all content is displayed using the full width and height available.

```javascript
<Deck>
	<Slide>Slide content</Slide>
</Deck>
```

The slide component will accept a `note` attribute, which will display presenter notes in the presenter notes window.

```javascript
<Deck>
	<Slide note="These are the presenter notes">Slide content</Slide>
</Deck>
```

### Title

```javascript
<Title>This is a title</Title>
```

### Subtitle

```javascript
<Subtitle>This is a subtitle</Subtitle>
```

### Text

```javascript
<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```

### Highlight

```javascript
<Title>This it a <Highlight>title</Highlight></Text>
<Text>Lorem ipsum <Highlight>dolor</Highlight> sit amet, consectetur adipiscing elit.</Text>
```

### Quote

```javascript
<Quote quotee="Sam Bellen">Lorem ipsum dolor sit amet</Quote>
```

### Image

```javascript
<Image src={image} alt="image description" />
```

The `Image` component accepts a few attributes.
Using the `full` attribute, the image will take up all available space.

```javascript
<Image src={image} alt="image description" full />
```

Using the `color="#fff"` attribute, the image will have an overlay color.

```javascript
<Image src={image} alt="image description" color="tomato" />
```

By default the images will display using `object-fit: cover;`, this might cut of some of the top or sides. By setting the `contain` attribute they will display in completely.

```javascript
<Image src={image} alt="image description" contain />
```

### Video

The `Video` component accepts the same `full` and `color` properties as images. There are some other properties to control the video player.

Setting the autoplay property will start the video playback on load.

```javascript
<Video src={video} autoplay />
```

Using the `loop` property will play the video in a continuous loop.

```javascript
<Video src={video} loop />
```

### List

#### Ordered lists

```javascript
<List ordered>
	<li>one</li>
	<li>two</li>
	<li>three</li>
	<li>four</li>
</List>
```

#### Unordered lists

```javascript
<List>
	<li>one</li>
	<li>two</li>
	<li>three</li>
	<li>four</li>
</List>
```

### Columns

You can add as many child nodes as you want and they will be displayed in nice equal columns.

```javascript
<Columns>
	<div>Column 1</div>
	<div>Column 2</div>
</Columns>
```

### Code

This component accepts 2 attributes, `code` which is a string of the code to display, and `lang` which default to `javascript`.

```javascript
<Code code={'const foo = "bar";\nconsole.log(foo);'} />
```

> The code is formatted using the amazing [Prism.js library](https://prismjs.com/). If you need a language which is not included in the Prism.js default set of languages, you can import it **after** you've imported the `<Code />` component.

```javascript
import { Slide, Code } from "@sambego/diorama";
import "prismjs/components/prism-bash.min.js";

const CodeExample = () => (
	<Slide>
		<Code code="npm install @sambego/diorama" lang="bash" />
	</Slide>
);
```

### Browser

> Note: Loading mixed content might not work when not using https

```javascript
<Browser url="https://talks.sambego.be" />
```

## Customisation

By default, all components are good lookingShould you want customise the look of a component, you can easily add some custom styles.

### Overwrite the color variables

The easiest way to get some color customisation is to overwrite the color CSS variables. The default color scheme is based on oceanic next. These are the default color variables.

```css
:root {
	--color-gray-0: #1b2b34;
	--color-gray-1: #343d46;
	--color-gray-2: #4f5b66;
	--color-gray-3: #65737e;
	--color-gray-4: #a7adba;
	--color-gray-5: #c0c5ce;
	--color-gray-6: #cdd3de;
	--color-gray-7: #d8dee9;

	--color-gray-dark: var(--color-gray-0);
	--color-gray-medium: var(--color-gray-4);
	--color-gray-light: var(--color-gray-7);

	--color-red: #ec5f67;
	--color-orange: #f99157;
	--color-yellow: #fac863;
	--color-green: #99c794;
	--color-teal: #5fb3b3;
	--color-blue: #6699cc;
	--color-pink: #c594c5;
	--color-brown: #ab7967;

	--color-primary: var(--color-green);
	--color-seconday: var(--color-teal);

	--color-danger: var(--color-red);
	--color-success: var(--color-green);
	--color-info: var(--color-blue);
	--color-warning: var(--color-yellow);
}
```

### Use the `.diorama-*` classes

All components have a `.diorama-*` class, which you can use to add extra CSS to them.

Eg. `.diorama-slide`, `.diorama-title`, `.diorama-code`, ...

### Add an extra CSS class

You can add extra CSS classes by simply passing a `className` property to a component.

```javascript
<Title className="fancy-css-class">...</Title>
```

### Add inline styles

It is also possible to pass some inline styles to each component.

```javascript
<Title style={{color: 'tomato'}}>...</title>
```

## Accessing presentation Deck informations from its children

You can use the `DeckContext` to access updated context information about the presentation and utility methods, avoiding being injected and being accessible from nested components enclosed as children of `Deck`.

## Navigating between Slides

If you want to navigate between slides using code, the `Deck` component injects a `DeckContext` exposing various utils. Among others, there is a `navigate()` method. You can use this method to navigate to another slide. The navigate function accepts the index of the slide to navigate to as a parameter.

```javascript
const FirstSlide = ({ navigate }) => {
	const handleGoToLastSlide = event => {
		event.preventDefault();
		navigate(1);
	};

	return (
		<Slide>
			<button onClick={handleGoToLastSlide}>Go to the last slide</button>
		</Slide>
	);
};

const LastSlide = ({ navigate }) => {
	const handleGoToFirsttSlide = event => {
		event.preventDefault();
		navigate(0);
	};

	return (
		<Slide>
			<button onClick={handleGoToFirsttSlide}>Go to the first slide</button>
		</Slide>
	);
};

<Deck>
	<FirstSlide />
	<LastSlide />
</Deck>;
```
