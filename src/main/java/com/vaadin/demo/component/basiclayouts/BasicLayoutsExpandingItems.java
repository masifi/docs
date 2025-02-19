package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/expanding-items")
public class BasicLayoutsExpandingItems extends Div {

    private static final String DEFAULT_SIZE_OPTION = "Default size";
    private static final String EXPANDED_SIZE_OPTION = "Expand";

    public BasicLayoutsExpandingItems() {
        // tag::snippet[]
        Button button1 = new Button("Button 1");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.add(button1);
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Item sizing");
        radioButtonGroup.setItems(DEFAULT_SIZE_OPTION, EXPANDED_SIZE_OPTION);
        radioButtonGroup.setValue(DEFAULT_SIZE_OPTION);
        radioButtonGroup.addValueChangeListener(e -> layout
                .setFlexGrow(DEFAULT_SIZE_OPTION.equals(e.getValue()) ? 0 : 1,
                        button1));
        // end::snippet[]

        this.setClassName("basic-layouts-example");

        this.add(layout, radioButtonGroup);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsExpandingItems> { // hidden-source-line
    } // hidden-source-line
}
