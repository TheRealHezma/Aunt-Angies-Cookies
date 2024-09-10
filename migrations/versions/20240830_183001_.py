
# from alembic import op
# import sqlalchemy as sa
# import os

# # revision identifiers, used by Alembic.
# revision = '62cc3eb6a2ff'
# down_revision = None
# branch_labels = None
# depends_on = None

# # Get environment and schema
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get("SCHEMA")


# def upgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     op.create_table('users',
#         sa.Column('id', sa.Integer(), nullable=False),
#         sa.Column('username', sa.String(length=40), nullable=False),
#         sa.Column('email', sa.String(length=255), nullable=False),
#         sa.Column('hashed_password', sa.String(length=255), nullable=False),
#         sa.PrimaryKeyConstraint('id'),
#         sa.UniqueConstraint('email'),
#         sa.UniqueConstraint('username')
#     )
#     if environment == "production":
#         op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

#     op.create_table('cookies',
#         sa.Column('id', sa.Integer(), nullable=False),
#         sa.Column('user_id', sa.Integer(), nullable=False),
#         sa.Column('name', sa.String(), nullable=False),
#         sa.Column('description', sa.String(), nullable=True),
#         sa.Column('price', sa.Float(), nullable=True),
#         sa.Column('created_at', sa.DateTime(), nullable=True),
#         sa.Column('updated_at', sa.DateTime(), nullable=True),
#         sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
#         sa.PrimaryKeyConstraint('id')
#     )
#     if environment == "production":
#         op.execute(f"ALTER TABLE cookies SET SCHEMA {SCHEMA};")

#     op.create_table('reviews',
#         sa.Column('id', sa.Integer(), nullable=False),
#         sa.Column('user_id', sa.Integer(), nullable=False),
#         sa.Column('cookie_id', sa.Integer(), nullable=False),
#         sa.Column('review', sa.String(), nullable=False),
#         sa.Column('stars', sa.Integer(), nullable=False),
#         sa.Column('created_at', sa.DateTime(), nullable=True),
#         sa.Column('updated_at', sa.DateTime(), nullable=True),
#         sa.ForeignKeyConstraint(['cookie_id'], ['cookies.id'], ),
#         sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
#         sa.PrimaryKeyConstraint('id')
#     )
#     if environment == "production":
#         op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
#     # ### end Alembic commands ###


# def downgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     if environment == "production":
#         op.execute(f"DROP TABLE IF EXISTS {SCHEMA}.reviews")
#         op.execute(f"DROP TABLE IF EXISTS {SCHEMA}.cookies")
#         op.execute(f"DROP TABLE IF EXISTS {SCHEMA}.users")
#     else:
#         op.drop_table('reviews')
#         op.drop_table('cookies')
#         op.drop_table('users')
#     # ### end Alembic commands ###



"""empty message

Revision ID: 62cc3eb6a2ff
Revises:
Create Date: 2024-08-30 18:30:01.843137

"""
from alembic import op
import sqlalchemy as sa
import os

# revision identifiers, used by Alembic.
revision = '62cc3eb6a2ff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('cookies',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('price', sa.Float(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE cookies SET SCHEMA {SCHEMA};")

    op.create_table('reviews',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('cookie_id', sa.Integer(), nullable=False),
        sa.Column('review', sa.String(), nullable=False),
        sa.Column('stars', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['cookie_id'], ['cookies.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('cookies')
    op.drop_table('users')
    # ### end Alembic commands ###



# """empty message

# Revision ID: 62cc3eb6a2ff
# Revises:
# Create Date: 2024-08-30 18:30:01.843137

# """
# from alembic import op
# import sqlalchemy as sa
# import os

# # revision identifiers, used by Alembic.
# revision = '62cc3eb6a2ff'
# down_revision = None
# branch_labels = None
# depends_on = None


# def upgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     op.create_table('users',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('username', sa.String(length=40), nullable=False),
#     sa.Column('email', sa.String(length=255), nullable=False),
#     sa.Column('hashed_password', sa.String(length=255), nullable=False),
#     sa.PrimaryKeyConstraint('id'),
#     sa.UniqueConstraint('email'),
#     sa.UniqueConstraint('username')
#     )
#     op.create_table('cookies',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('user_id', sa.Integer(), nullable=False),
#     sa.Column('name', sa.String(), nullable=False),
#     sa.Column('description', sa.String(), nullable=True),
#     sa.Column('price', sa.Float(), nullable=True),
#     sa.Column('created_at', sa.DateTime(), nullable=True),
#     sa.Column('updated_at', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )
#     op.create_table('reviews',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('user_id', sa.Integer(), nullable=False),
#     sa.Column('cookie_id', sa.Integer(), nullable=False),
#     sa.Column('review', sa.String(), nullable=False),
#     sa.Column('stars', sa.Integer(), nullable=False),
#     sa.Column('created_at', sa.DateTime(), nullable=True),
#     sa.Column('updated_at', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['cookie_id'], ['cookies.id'], ),
#     sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )
#     # ### end Alembic commands ###


# def downgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     op.drop_table('reviews')
#     op.drop_table('cookies')
#     op.drop_table('users')
#     # ### end Alembic commands ###
