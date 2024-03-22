/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundSlider from 'react-background-slider';
import { AiOutlineMail, AiOutlinePhone, AiOutlineSearch } from 'react-icons/ai';
import './Banner.css';
import { PROPERTIES_URL } from '../../routes/frontend';
import { SearchInputContext } from '../../contexts/SearchInputContext';
import WhatsApp from '../libs/WhatsApp/WhatsApp';

function Banner() {
  const navigate = useNavigate();

  const { inputObj, setInputObj } = useContext(SearchInputContext);

  return (
    <section className="banner-section position-relative">
      <div className="bg-light-dark" />
      <div className="contact-banner">
        <span className="ml-4">
          <AiOutlinePhone size={20} />
          {' '}
          +(237) 672123230
        </span>
              &nbsp;&nbsp;
        <span className="ml-4">
          <AiOutlineMail size={20} />
          {' '}
          info@mboahub.com
        </span>
        <WhatsApp phone="672378393" text="Chat With Us" />
      </div>
      <div className="banner-content container">
        <strong>Real Estate Searching Platform</strong>
        <p>
          Find The House of Your Dream
          <br />
          Using Our Platform
        </p>
        <div className="row mb-4">
          <div className="col-sm-12 col-md-8">
            <div className="form-section row">
              <input
                type="text"
                value={inputObj?.listingName || ''}
                onChange={(e) => setInputObj({ ...inputObj, listingName: e.target.value })}
                className="col-md-4"
                placeholder="What are you looking for?"
              />
              <input
                type="text"
                value={inputObj?.location || ''}
                onChange={(e) => setInputObj({ ...inputObj, location: e.target.value })}
                className="col-md-3"
                placeholder="Where are you looking for?"
              />

              <select
                value={inputObj?.businessType || ''}
                onChange={(e) => setInputObj({ ...inputObj, businessType: e.target.value })}
                name="businessType"
                className="col-md-3"
              >
                <option value="all">All Types</option>
                <option value="for_rent">For rent</option>
                <option value="for_sale">For sale</option>
              </select>
              <button
                type="button"
                onClick={() => navigate(PROPERTIES_URL)}
                className="bg-primary col-md-2 text-small text-bold text-white border-0"
              >
                Search&nbsp;&nbsp;
                <AiOutlineSearch />
              </button>
            </div>
          </div>
        </div>
        <strong className="text-white text-bold">Need more search options ?</strong>
        <span className="advanced-search" onClick={() => navigate(PROPERTIES_URL)}>
          Advanced Search
        </span>
      </div>
      <BackgroundSlider images={['/photos/banner-photo-1.webp', '/photos/banner-photo-2.webp']} duration={7} transition={2} />
    </section>
  );
}

export default Banner;
