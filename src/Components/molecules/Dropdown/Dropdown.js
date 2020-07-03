import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 500px;
  padding: 50px 0 0 80px;
  position: relative;
`;

const StyledList = styled.ul`
  height: 250px;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const StyledHeading = styled.h1`
  display: inline-block;
  margin: 0 10px 0 0;
`;

const StyledListItem = styled.li`
  position: ${({ isClicked }) => (isClicked ? 'initial' : 'absolute')};
  list-style-type: none;
  width: 100px;
  background-color: #3a3b68;
  margin-bottom: 3px;
  padding: 5px;
  text-align: center;

  &:hover {
    background-color: #565785;
  }
`;

const StyledDiv = styled(StyledListItem)`
  z-index: 50;
  background-color: #565785;
`;

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
  }

  toggleList = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }));
  };

  render() {
    const { filterArr, title, sortItems } = this.props;
    const selectedTitle = filterArr.map(item => {
      if (item.selected) {
        return item.title;
      }
    });

    return (
      <Wrapper>
        <StyledHeading>{title}</StyledHeading>
        <StyledList isClicked={this.state.isClicked}>
          <StyledDiv isClicked={this.state.isClicked} onClick={() => this.toggleList()}>
            {selectedTitle[0]}
          </StyledDiv>
          {filterArr.map(item => (
            <StyledListItem
              key={item.title}
              isClicked={this.state.isClicked}
              onClick={() => {
                sortItems(item.id, item.key);
                this.toggleList();
              }}
            >
              {item.title}
            </StyledListItem>
          ))}
        </StyledList>
      </Wrapper>
    );
  }
}

Dropdown.propTypes = {
  filterArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  sortItems: PropTypes.func.isRequired,
};

export default Dropdown;
