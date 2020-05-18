export enum enumTipoDeCosa {
    COSAS_LINDAS = 'cosaslindas',
    COSAS_FEAS = 'cosasfeas'
}

export class TipoPublicacion {

    // #region Atributos

    tipoDeCosa: enumTipoDeCosa;
    titulo: string;
    pathIcono: string;
    colorPrincipal: string;
    colorSecundario: string;
    pathFotos: string;

    // #endregion

    constructor(tipoDeCosa: enumTipoDeCosa) {

        switch (tipoDeCosa) {

            case enumTipoDeCosa.COSAS_LINDAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_LINDAS;
                this.titulo = 'Cosas Lindas';
                this.pathIcono = 'assets/svg/cosaslindas_outline.svg';
                this.colorPrincipal = 'colorcosaslindas';
                this.colorSecundario = 'cosaslindas_secundario';
                this.pathFotos = 'cosaslindas/';
                break;
            }

            case enumTipoDeCosa.COSAS_FEAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_FEAS;
                this.titulo = 'Cosas Feas';
                this.pathIcono = 'assets/svg/cosasfeas_outline.svg';
                this.colorPrincipal = 'colorcosasfeas';
                this.colorSecundario = 'cosaslindas_secundario';
                this.pathFotos = 'cosasfeas/';
                break;
            }
        }
    }
}
