import React from "react";
import style from "./AnimalDetail.module.css";

export const AnimalDetail = ({ animal, onOpenImage }) => {
    const onClick = e => {
        if (onOpenImage) {
            e.preventDefault();
            onOpenImage();
        }
    };
    return (
        <section>
            <h1 className={style.commonName}>{animal.common_name}</h1>
            <h2 className={style.latinName}>{animal.latin_name}</h2>
            <h3 className={style.conservationStatus}>
                {animal.conservation_status}
            </h3>
            {animal.image_thumb && (
                <a href={animal.image_full} onClick={onClick} target="_blank">
                    <img src={animal.image_thumb} />
                </a>
            )}
            <p>{animal.description}</p>
        </section>
    );
};
export default AnimalDetail;
