import React, {Component} from 'react';

class WidgetParking extends Component {

    constructor(props) {
        super(props);
        this.state = {parkings: [], counter: 0};
    }

    componentDidMount() {
        fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=export-api-parking-citedia')
            .then(response => response.json())
            .then(data => {
                this.setState({parkings: data.records});
                console.log(data);
            })

        this.timer = setInterval(() => {
            const { parkings, counter } = this.state;
            this.props.animate().then(() => this.setState({counter: counter >= parkings.length ? 0 : counter + 1}));
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {

        const { parkings, counter } = this.state;
        const parking = parkings[counter];

        if (!parkings[counter]) {
            return (<div></div>);
        }

        /*
    orange : #FFA240
    bleu foncé : #0988B2
    bleu clair : #40CFFF
    orange clair : #FFAE5A
    marron : #B2681B
    */
        const style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#99CFFF',
            border: 'solid 2px #0988B2',
            borderRadius: '5px'
        };
        const item = (
            <article key={parking.fields.key}>
                <h3>{parking.fields.key}</h3>
                <h3>{parking.fields.free} places disponibles</h3>
                <h4>{parking.fields.status}</h4>
            </article>
        );

        const date = new Date();

        return (
            <div>
                <div style={style}>{date.toLocaleDateString('fr-FR')}</div>
                <div style={style}>
                    <div>
                        {item}
                    </div>
                </div>


            </div>

        );
    }

}

export default WidgetParking;