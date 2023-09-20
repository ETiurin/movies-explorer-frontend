import './Techs.css';

function Techs() {
    return (
        <section className='techs' id="techs">
            <div className='techs__heading'>
                <h2 className='techs__heading-title'>Технологии</h2>
            </div>
            <h3 className='techs__title'>7 технологий</h3>
            <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__container'>
                <li className='techs__object'>
                    <p className='techs__object-text'>HTML</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>CSS</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>JS</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>React</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>Git</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>Express.js</p>
                </li>
                <li className='techs__object'>
                    <p className='techs__object-text'>mongoDB</p>
                </li>
            </ul>
        </section>
    );
}

export default Techs;