## Auto-Complete Component

### Template

Add a template for the select fields - each field is 50px height.<br> 
Use the #itemTemplate as a reference.<br>
Example:
```html
<ng-template let-item #rowTemplate>
      <div style="display: flex; align-items: center; width: 100%">
        <span [class]="'bug'" [ngClass]="'span-pic'"></span>
        <span>{{ item.name }}</span>
      </div>
    </ng-template>
```

### Properties
- #### dataSource:
Add the array of searchable elements - it should have at least `id` and `name` keys .

- #### select:
Use for getting the selected element on click.

- #### placeHolder:
A placeholder for the input field.

- #### outlineColor:
Change the outline color of the input field on focus.

- #### borderColor:
Change the Border color of the input field.

- #### inputFontFamily:
Modify the font family of the input field.

- #### width:
Modify the width of the component.
