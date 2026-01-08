import pytest
from aurweb import db
from aurweb.models.account_type import USER_ID
from aurweb.models.user import User
from aurweb.testing.requests import Request

# We need to use the `db_test` fixture at some point
# during our test functions.
@pytest.fixture(autouse=True)
def setup(db_test: None) -> None:
    return

# Or... specify it in a dependency fixture.
@pytest.fixture
def user(db_test: None) -> User:
    with db.begin():
        user = db.create(User, Username="test",
                         Email="test@example.org",
                         Passwd="testPassword",
                         AccountTypeID=USER_ID)
    yield user

def test_user_login(user: User):
    assert isinstance(user, User) is True

    fake_request = Request()
    sid = user.login(fake_request, "testPassword")
    assert sid is not None
