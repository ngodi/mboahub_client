import React from 'react';

import PropertyAgent from './PropertyAgent';

import './PropertyAgentSection.scss';

function PropertyAgentSection() {
  return (
    <div className="main-margin">
      <div className="text-center">
        <span className="primary-heading">THE BEST AGENTS</span>
        <p className="secondary-heading">Meet Our Agents</p>
      </div>
      <div className="agent-listing row mx-4">
        <PropertyAgent
          agentName="Mireille Ngono"
          agencyName="Prime Horizon Realty"
          agentListings={213}
          imageUrl="/photos/female-placeholder-image.png"
          description="Prime Horizon Realty specializes in luxury
           residential properties, offering discerning clients
           exclusive access to prestigious homes with unparalleled
           amenities and breathtaking views. "
        />
        <PropertyAgent
          agentName="Ayodele Mbah"
          agencyName="Urban Nexus Properties"
          agentListings={339}
          imageUrl="/photos/male-placeholder-image.png"
          description="Urban Nexus Properties
           is your go-to agency for urban living solutions, catering
           to a diverse clientele seeking modern apartments,
           chic condos, and trendy lofts in vibrant city centers."
        />
        <PropertyAgent
          agentName="Ndidi Nwachukwu"
          agencyName="Coastal Retreat Realty"
          agentListings={120}
          imageUrl="/photos/male-placeholder-image.png"
          description="Coastal Retreat Realty specializes in
           coastal properties, offering clients access to serene
           beachfront retreats, charming
           seaside cottages, and luxurious waterfront estates. . "
        />
      </div>
    </div>
  );
}

export default PropertyAgentSection;
