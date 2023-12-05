import { useNavigate } from 'react-router-dom';
import * as S from './UserPreview.styles';
import ProfileImage from '../ProfileImage';

interface UserPreviewProps {
  profileImg: string;
  accountId: string;
  nickName: string;
  keyword: string[];
}

export default function UserPreview({ profileImg, accountId, nickName, keyword }: UserPreviewProps) {
  const navigate = useNavigate();

  return (
    <S.Container
      onClick={() => {
        navigate(`/feed/${accountId}`);
      }}
      >
      <S.HorizontalFirstStartContainer>
        <ProfileImage type="small" src={profileImg} />
        <S.VerticalFirstStartContainer>
          <S.UserIdText>
            {nickName}
          </S.UserIdText>
          <S.HorizontalFirstStartContainer>
            {keyword.map((value, index) => (
              <S.UserKeywordTag key={(index)}>
                <S.UserKeywordTagFont>
                  {value}
                </S.UserKeywordTagFont>
              </S.UserKeywordTag>
            ))}
          </S.HorizontalFirstStartContainer>
        </S.VerticalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
    </S.Container>
  );
}