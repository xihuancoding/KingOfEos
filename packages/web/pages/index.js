import '@kingofeos/theme/dist/semantic.min.css'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.eot'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff2'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import { siteBackgroundColor, backgroundGradient } from '../src/theme'
import { Canvas, CurrentKingdom, Explanation, HallOfFame, FAQ } from '../src/components/index'
import withRedux from '../src/utils/withRedux'
import { initStore } from '../src/store'
import { fetchCurrentKingdom, fetchHallOfFame } from '../src/store/actions'

class Index extends React.Component {
    static propTypes = {
        fetchCurrentKingdomAction: PropTypes.func.isRequired,
        fetchHallOfFameAction: PropTypes.func.isRequired,
        currentKingdomKings: PropTypes.array.isRequired,
        currentKingdomNumber: PropTypes.number.isRequired,
        hallOfFameKings: PropTypes.array.isRequired,
    }

    componentDidMount() {
        const { fetchHallOfFameAction, fetchCurrentKingdomAction } = this.props
        fetchCurrentKingdomAction()
        fetchHallOfFameAction()
    }

    render() {
        const { currentKingdomKings, currentKingdomNumber, hallOfFameKings } = this.props
        return (
            <div className="root">
                <Head>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <Canvas />
                <CurrentKingdom kings={currentKingdomKings} kingdomNumber={currentKingdomNumber} />
                <div className="divider" />
                <Explanation />
                <div className="divider" />
                <HallOfFame kings={hallOfFameKings} />
                <div className="divider" />
                <FAQ />
                <style jsx>{`
                    .root {
                        background-color: ${siteBackgroundColor};
                        margin-bottom: 40px;
                    }

                    .divider {
                        width: 100%;
                        transform: skew(1.5deg, -1.5deg);
                        margin-bottom: 40px;
                        &::before {
                            content: '';
                            background-image: ${backgroundGradient};
                            height: 40px;
                            display: block;
                        }
                    }

                    * {
                        box-sizing: border-box;
                    }
                    :global(body) {
                        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                `}</style>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    fetchCurrentKingdomAction: bindActionCreators(fetchCurrentKingdom, dispatch),
    fetchHallOfFameAction: bindActionCreators(fetchHallOfFame, dispatch),
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
