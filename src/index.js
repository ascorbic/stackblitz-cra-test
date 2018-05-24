import React, { Component } from "react";
import { render } from "react-dom";
import AnimalDetail from "./components/AnimalDetail";
import "./style.css";

class App extends Component {
    state = {
        animals: [],
        selectedAnimal: null,
        lightboxAnimal: null
    };
    componentDidMount() {
        this.loadAnimals();
    }

    loadAnimals = async () => {
        const response = await fetch(
            "//api.jsonbin.io/b/5afc5c68c2e3344ccd96b97c/1"
        );
        const animals = await response.json();
        if (animals.length) {
            this.setState({ animals, selectedAnimal: animals[0] });
        }
    };

    render() {
        const animal = this.state.selectedAnimal;
        const detail = this.state.selectedAnimal ? (
            <AnimalDetail
                key={animal.uuid}
                animal={this.state.selectedAnimal}
                onOpenImage={() => this.setState({ lightboxAnimal: animal })}
            />
        ) : null;
        return (
            <div id="animals">
                <ul>
                    {this.state.animals.map(animal => (
                        <li
                            key={animal.uuid}
                            className={
                                animal.uuid === this.state.selectedAnimal.uuid
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                this.setState({ selectedAnimal: animal })
                            }
                        >
                            {animal.common_name}
                        </li>
                    ))}
                </ul>
                <div id="detail">{detail}</div>

                {this.state.lightboxAnimal && (
                    <div
                        id="lightbox"
                        onClick={() => this.setState({ lightboxAnimal: null })}
                    >
                        <img
                            src={this.state.lightboxAnimal.image_full}
                            style={{
                                backgroundImage:
                                    "url(" +
                                    this.state.lightboxAnimal.image_thumb +
                                    ")"
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

render(<App />, document.getElementById("root"));
