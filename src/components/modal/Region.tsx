import React from 'react';
// import { regionState } from '../../store/atom';
// import { useRecoilState } from 'recoil';
import { RegionDataType, SiDoDataType } from '../../types/Region.type';
import * as R from '../../styles/Region.styled';
import { MdClose } from 'react-icons/md';
import { SubmitButton } from '../../styles/template';
import { regionService, getRegionData } from '../../api/api';
//import { DEFAULT_SIDO } from '../../constants';

const Region = ({ setShowRegionModal }: any) => {
  const [regionData, setRegionData] = React.useState<RegionDataType[]>([]);

  //! 여기서도 siDo를 string으로 하면 에러
  //! RegionProps를 사용해도 에러
  const [region, setRegion] = React.useState<{ siDo: string; siGuGun: string }>({
    siDo: '',
    siGuGun: '',
  });

  const [siGuGun, setSiGuGun] = React.useState<string[]>([]);

  const onClickSiDo = (siDo: string, index: number) => {
    //if (region.siDo === siDo) return;
    setRegion((prevRegion) => ({ ...prevRegion, siDo }));
    console.log(regionData);
    // setSiGuGun(Object.values(regionData)[index]);
    //console.log(region);
  };

  const onClickSiGuGun = (siGuGun: string) => {
    //if (region.siGuGun === siGuGun) return;
    setRegion((prevRegion) => ({ ...prevRegion, siGuGun }));
  };

  React.useEffect(() => {
    getRegionData<RegionDataType[]>(regionService).then((data) => {
      setRegionData(data);
    });
  }, []);
  console.log(regionData);

  return (
    <R.Container>
      <R.HeaderContainer>
        <R.CloseButton
          onClick={() => {
            setShowRegionModal(false);
          }}
        >
          <MdClose />
        </R.CloseButton>
        <R.HeaderText>거주지역 선택</R.HeaderText>
      </R.HeaderContainer>
      <R.ContentContainer>
        <R.MenuTitleContainer>
          <R.MenuTitle>시/도</R.MenuTitle>
          <R.MenuTitle>시/구/군</R.MenuTitle>
        </R.MenuTitleContainer>
        <R.MenuListContainer>
          <R.Menu>
            {Object.keys(regionData).map((siDo: string, index: number) => (
              <R.MenuList key={index} onClick={() => onClickSiDo(siDo, index)}>
                {siDo}
              </R.MenuList>
            ))}
          </R.Menu>

          <R.Menu>
            {siGuGun.map((siGuGun: string, index: number) => (
              <R.MenuList key={index} onClick={() => onClickSiGuGun(siGuGun)}>
                {siGuGun}
              </R.MenuList>
            ))}
          </R.Menu>
        </R.MenuListContainer>
      </R.ContentContainer>
      <SubmitButton disabled={false}>확인</SubmitButton>
    </R.Container>
  );
};

export default Region;
