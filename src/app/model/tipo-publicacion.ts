export enum enumTipoDeCosa {
    COSAS_LINDAS = 'cosaslindas',
    COSAS_FEAS = 'cosasfeas'
}

export class TipoPublicacion {

    // #region Atributos

    tipoDeCosa: enumTipoDeCosa;
    titulo: string;
    pathIcono: string;
    color: string;
    pathFotos: string;

    // #endregion

    constructor(tipoDeCosa: enumTipoDeCosa) {

        switch (tipoDeCosa) {

            case enumTipoDeCosa.COSAS_LINDAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_LINDAS;
                this.titulo = "Cosas Lindas";
                this.pathIcono = "assets/svg/cosaslindas_outline.svg"
                this.color = "colorcosaslindas";
                this.pathFotos = "cosaslindas/";
                break;
            }

            case enumTipoDeCosa.COSAS_FEAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_FEAS;
                this.titulo = "Cosas Feas";
                this.pathIcono = "assets/svg/cosasfeas_outline.svg"
                this.color = "colorcosasfeas";
                this.pathFotos = "cosasfeas/";
                break;
            }
        }
    }
}
