# Diorama

Diorama is a set of React.js components to easily create an attractive and customisable presentation. All content will adjust to the available width of the screen, so you won't have some clipped slides when forced to present with a projector of lesser quality.

Why would you create a presentation in React.js instead of powerpoint, keynote or Google Slides? You can add live demos, straight in your slides. Since every slide is a react component, there's no limit to what you can do.

You can navigate trough the slides by using the arrow keys on your keyboard, using a presenter remote\* or swiping trough the slides on a mobile phone.

\* Tested with a Logitech R400 and Logitech Spotlight

## Demo

Check out the demo right here https://sambego.github.io/diorama-demo/

## Installing

```
npm install @sambego/diorama
```

or

```
yarn add @sambego/diorama
```

## Usage

Once you have the components installed trough NPM, you can import them in your react project.

```javascript
import React from 'react';
import { Deck, Slide, Title, Text } from '@sambego/diorama';

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
- [Quote](#quote)
- [Image](#image)
- [List](#list)
- [Columns](#columns)
- [Code](#code)
- [Browser](#browser)
- [Dec](#deck)
- [Dec](#deck)
- [Dec](#deck)

### Deck

This is the root element of each presentation, it will handle navigation trough the slides.

```javascript
<Deck>...</Deck>
```

### Slide

Even though the `<Deck />` component accepts all valid React nodes as children, the `<Slide />` component will make sure all content is displayed using the full width and height available.

```javascript
<Deck>
  <Slide>Slide content</Slide>
</Deck>
```

The slide component will accept a `note` attribute, which will display presenter notes in the console. Most browser support showing the console in a separate window, so you can move it to your secondary screen.

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

This component accepts 2 attributes, `code` which is a string of the code to display, and `lang` which default to `javascript`;

```javascript
<ColumnsCode code={'const foo = "bar";\nconsole.log(foo);'} />
```

### Browser

```javascript
<Browser url="http://talks.sambego.be" />
```
