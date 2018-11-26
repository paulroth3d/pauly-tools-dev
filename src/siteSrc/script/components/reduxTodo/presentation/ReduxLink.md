An html link.

Can be a simple text link:
```
<ReduxLink onClick={evt => {console.log('link was clicked');}} active={true}>Simple Link</ReduxLink>
```

However, it can be hidden or shown based on the `active` property:

This link will not be shown:
```
<ReduxLink onClick={evt => {console.log('link was clicked');}} active={false}>Simple Link</ReduxLink>
```