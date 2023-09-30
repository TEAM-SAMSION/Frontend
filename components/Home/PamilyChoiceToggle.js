import { useState } from "react";
import { FlatList, View } from "react-native";
import DownIcon from "../../assets/Svgs/arrow_down.svg";
import UpIcon from "../../assets/Svgs/arrow_up.svg";
import styled from "styled-components/native";
import { colors } from "../../colors";

export const PamilyChoiceToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const options = ["개모임", "강아쥐"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <>
      <DropdownContainer isOpen={isOpen} onPress={toggleDropdown}>
        <DropdownTitle>{selectedValue || "Pamily 선택 "}</DropdownTitle>
        {isOpen ? (
          <UpIcon
            width={16}
            height={16}
            style={{ position: "absolute", right: 10 }}
          />
        ) : (
          <DownIcon
            width={16}
            height={16}
            style={{ position: "absolute", right: 10 }}
          />
        )}
      </DropdownContainer>

      {isOpen && (
        <>
          {options.map((option) => (
            <DropdownBox
              key={option}
              onPress={() => handleOptionSelect(option)}
            >
              <DropdownTitle>{option}</DropdownTitle>
            </DropdownBox>
          ))}
          <DropdownBox
            style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
          >
            <DropdownTitle>+</DropdownTitle>
          </DropdownBox>
        </>
      )}
    </>
  );
};

const DropdownContainer = styled.TouchableOpacity`
  width: 109px;
  height: 32px;
  padding: 8px 10px 8px 16px;
  margin: 12px 0px 0px 12px;
  z-index: 1;
  border-radius: ${({ isOpen }) => (isOpen ? "8px 8px 0px 0px" : "8px")};
  border-bottom-width: ${({ isOpen }) => (isOpen ? "1px" : "0px")};
  border-bottom-color: rgba(0, 0, 0, 0.12);
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`;
const DropdownTitle = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: ${colors.grey_600};
`;
const DropdownBox = styled.TouchableOpacity`
  width: 109px;
  height: 32px;
  padding: 8px 10px 8px 16px;
  margin-left: 12px;
  z-index: 1;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`;
