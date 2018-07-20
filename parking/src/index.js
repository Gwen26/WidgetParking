import React, {Component} from 'react';

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {parkings: [], date: new Date(), value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    handleSubmit(event) {
        console.log(this.state.value)
        event.preventDefault();
    }


    componentDidMount() {
        this.setState({date: new Date()});

        fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=export-api-parking-citedia')
            .then(response => response.json())
            .then(data => {
                this.setState({parkings: data.records});
                console.log(data);
            })

        this.timer = setInterval(() => {
            this.props.animate().then(() => this.setState({parkings: new []}));
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {

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
        const items = this.state.parkings.map(parking => (
            <article key={parking.fields.key}>
                <h3>{parking.fields.key}</h3>
                <h3>{parking.fields.free} places disponibles</h3>
                <h4>{parking.fields.status}</h4>
            </article>
        ));

        const parkings = this.state.parkings.map(parking => (
            <article>
                <h4>{parking.fields.key}</h4>
            </article>
        ));

        return (
            <div>
                <div style={style}>{this.state.date.toLocaleDateString('fr-FR')}</div>
                <div style={style}>
                    <div>
                        {items[0]}
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                 Parkings:
                                <select value={parkings} onChange={this.handleChange}>
                                    <option value={parkings[1]}>{parkings[1]}</option>
                                    <option value={parkings[2]}>{parkings[2]}</option>
                                    <option value={parkings[3]}>{parkings[3]}</option>
                                    <option value={parkings[4]}>{parkings[4]}</option>
                                </select>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>


            </div>

        );
    }

}

export default Clock;