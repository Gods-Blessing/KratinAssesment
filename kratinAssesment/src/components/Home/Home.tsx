import Footer from '../Footer/Footer';
import './Home.css';

export default function Home(){

    return (
        <section>
            <div className='div-1'>
                <div className='div-1-1'>
                    <p className='heading'>
                        Be a reason <br />
                        for <br />
                        someones Smile
                    </p>

                    <p className='sub-heading'>
                        It's time to Empower those
                        who blessed us , because we are nothing without them.
                        <br />
                        Let's be the support.
                    </p>

                    <div className='reach flex'>
                        <div className='flex'>
                            <p className='numbers'>60,000+</p>
                            <p className='worked-on'>Elders Empowered</p>
                        </div>
                        <div className='flex'>
                            <p className='numbers'>PAN India</p>
                            <p className='worked-on'>Operated</p>
                        </div>
                        <div className='flex'>
                            <p className='numbers'>500+</p>
                            <p className='worked-on'>Lives Saved</p>
                        </div>
                        <div className='flex'>
                            <p className='numbers'>4,000+</p>
                            <p className='worked-on'>Events Organised</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="div-2">
                <p className='div-2-heading'>
                    Help Elders so that you can become ideal for the future.
                </p>
            </div>

            <div className="div-3">
                <p>
                    Demographics for an ageing world
                </p>
                
                <div className='demographic-container'>
                    <div>
                        <div className='orange'>
                            <p className='count'>1.4bn</p>
                        </div>
                        <p>people will be aged 60 <br /> years or over by 2030</p>
                    </div>

                    <div>
                        <div className='green'>
                            <p className='count'>2.1bn</p>
                        </div>
                        <p>
                            older people will make <br />up more than one-fifth of <br /> the total population by 2050
                        </p>
                    </div>

                    <div>
                        <div className='blue'>
                            <p className='count'>80%</p>
                        </div>
                        <p>of older people will live <br /> in low- and middle-income <br /> countries by 2050</p>
                    </div>

                    <div>
                        <div className='maroon'>
                            <p className='count'>426m</p>
                        </div>
                        <p>the number of people <br />aged ≥ 80 years by 2050</p>
                    </div>
                </div>
            </div>
        <Footer/>

        </section>
    )
}
