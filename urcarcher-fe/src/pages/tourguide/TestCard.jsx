import React from 'react';
import BankCards from '../../bootstrap-template/components/BankCards';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';

function TestCard(props) {
    const bankCardData = {
        name: "My Bank Cards",
        items: [
          { type: "visa", number: "**** **** **** 1234", content: "Balance: $1000", link: "/visa" },
          { type: "mastercard", number: "**** **** **** 5678", content: "Balance: $500", link: "/mastercard" },
          { type: "discover", number: "**** **** **** 9101", content: "Balance: $300", link: "/discover" },
        ]
      };
    
    // CardOverlay에 필요한 데이터
    const overlayData = {
        img: 'https://via.placeholder.com/150',
        title: 'Sample Card Title',
        text: 'This is a sample card text.',
        textMuted: 'Last updated 3 mins ago',
    };

    return (
        <div>
          <BankCards data={bankCardData} />
          {/* CardOverlay에 필요한 props를 전달 */}
          <CardOverlay 
            className="my-custom-class" 
            img={overlayData.img} 
            title={overlayData.title} 
            text={overlayData.text} 
            textMuted={overlayData.textMuted} 
          />
        </div>
      );
}

export default TestCard;
